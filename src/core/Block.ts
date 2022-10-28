import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import EventBus, { IEventBus } from './EventBus';

export type BlockEventHandler = (...args: any) => void;
export type BlockEvents = Record<string, BlockEventHandler>;
export type BlockProps = {
    [key: string]: unknown;
    events?: BlockEvents;
};

export default class Block<T extends BlockProps = Record<string, unknown>> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    protected _element: HTMLElement | null = null;
    protected _eventBus: IEventBus;
    protected readonly props: T;
    public id = nanoid(6);
    public refs: Record<string, Block<T>> = {};
    protected children: Record<string, Block<T>> = {};

    public constructor(props: T = {} as T) {
        const eventBus = new EventBus();

        this.props = this._makePropsProxy(props);

        this._eventBus = eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    private _registerEvents(eventBus: IEventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
        return;
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    componentDidUpdate(oldProps: T, newProps: T): boolean {
        return true;
        return oldProps !== newProps;
    }

    setProps = (nextProps: Partial<BlockProps>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props as object, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this._compile();

        this._removeEvents();

        if (fragment.firstElementChild) {
            const newElement = fragment.firstElementChild;

            if (this._element) {
                this._element.replaceWith(newElement);
            }
            this._element = newElement as HTMLElement;
            this._addEvents();
        }
    }

    private _compile(): DocumentFragment {
        const fragment = document.createElement('template');

        const template = Handlebars.compile(this.render());
        fragment.innerHTML = template({
            ...this.props,
            children: this.children,
            refs: this.refs,
        });

        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="${id}"]`);

            if (!stub) {
                return;
            }

            const stubChilds = stub.childNodes.length ? stub.childNodes : [];

            const content = component.getContent();
            stub.replaceWith(content);

            const layoutContent = content.querySelector('[data-layout="1"]');

            if (layoutContent && stubChilds.length) {
                layoutContent.append(...stubChilds);
            }
        });

        return fragment.content;
    }

    private _removeEvents() {
        if (this.props.events) {
            Object.entries(this.props.events).forEach(([event, listener]) => {
                this._element?.removeEventListener(event, listener);
            });
        }
    }

    private _addEvents() {
        if (this.props.events) {
            Object.entries(this.props.events).forEach(([event, listener]) => {
                this._element?.addEventListener(event, listener);
            });
        }
    }

    render(): DocumentFragment | string {
        return new DocumentFragment();
    }

    getContent(): HTMLElement {
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }

        return this.element!;
    }

    private _makePropsProxy(props: T): T {
        return new Proxy<T>(props, {
            get: (target, prop: string) => {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: Record<string, unknown>, prop: string, value) => {
                const oldProps = { ...target };
                if (typeof target === 'object') {
                    target[prop] = value;
                }

                this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Permission denied');
            },
        });
    }

    show(force = false) {
        const el = this.getContent();
        if (el) {
            if (force) {
                el.classList.add('route-active');
            } else {
                el.classList.remove('route-hidden')
                el.classList.remove('route-active')
                // el.style.display = 'block';
            }
        }
    }

    hide() {
        const el = this.getContent();
        if (el) {
            el.style.display = 'none';
        }
    }

    onDestroy() {}

    public destroy() {
        if (this._element) {
            this._element.remove();
            this.onDestroy();
        }
    }
}
