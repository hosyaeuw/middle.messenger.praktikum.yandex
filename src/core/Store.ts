import deepClone from 'utils/deepClone';
import deepMerge from 'utils/deepMerge';
import isEqualObj from 'utils/isEqual';
import EventBus from './EventBus';

type State = Record<string, any>;

class Store {
    private _state: State;

    private _oldState: State;

    public _subscribers: Map<string, (state: State) => void>;

    private eventBus: () => EventBus;

    static EVENTS = {
        INIT: 'store:init',
        STORE_DM: 'store:did-mount',
        STORE_DU: 'store:did-update',
        USE: 'store:use',
    };

    constructor(initialState: State = {}) {
        const eventBus = new EventBus();
        this._state = this._makeStateProxy(initialState);
        this._oldState = { ...this._state };
        this._subscribers = new Map();
        this.eventBus = () => eventBus;

        eventBus.on(Store.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Store.EVENTS.STORE_DM, this._storeDidMount.bind(this));
        eventBus.on(Store.EVENTS.STORE_DU, this._storeDidUpdate.bind(this));
        eventBus.on(Store.EVENTS.USE, this._use.bind(this));

        eventBus.emit(Store.EVENTS.INIT);
    }

    private _init() {
        this.eventBus().emit(Store.EVENTS.STORE_DM);
    }

    private _storeDidMount() {
        this.storeDidMount();
    }

    public storeDidMount() {}

    private _storeDidUpdate(oldState: State, newState: State) {
        const response = this.storeDidUpdate(oldState, newState);
        if (response) {
            this.eventBus().emit(Store.EVENTS.USE);
        }
    }

    public storeDidUpdate(oldState: State = {}, newState: State = {}) {
        return !isEqualObj(oldState, newState);
    }

    private _use() {
        this._subscribers.forEach((subscriber: any) => {
            subscriber(this._state);
        });
    }

    public subscribe(subscriber: (state: State) => void, tag: string) {
        if (!this._subscribers.has(tag)) {
            this._subscribers.set(tag, subscriber);
            subscriber(this._state);
        }
    }

    public setState(newState: State) {
        if (newState === undefined) {
            return;
        }

        const merged = deepMerge(newState, deepClone(this._state));
        Object.assign(this._state, merged);
    }

    public getState() {
        return this._state;
    }

    private _makeStateProxy(state: State) {
        const self = this;
        return new Proxy(state, {
            set: (target: State, item: string, value: unknown) => {
                const t = target;
                t[item] = value;
                this.eventBus().emit(Store.EVENTS.STORE_DU, self._oldState, t);
                self._oldState = { ...t };
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }
}

export default Store;
