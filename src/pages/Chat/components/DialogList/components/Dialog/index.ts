import { Block } from 'core';

import './styles.scss';

export type DialogTypeProps = {
    unreadCount: number;
    name: string;
    time: string;
    text: string;
    selected?: boolean;
    src: string;
    onClick?: () => void;
};

type Props = DialogTypeProps & {
    events?: {
        click?: () => void;
    };
};

export default class Dialog extends Block<Props> {
    static componentName = 'Dialog';

    constructor(props: Props) {
        const defaultProps: Props = {
            src: '#',
            unreadCount: 0,
            name: '',
            time: '',
            text: '',
            selected: false,
        };

        if (props.onClick) {
            if (!props.events) {
                props.events = {};
            }
            props.events.click = props.onClick;
        }
        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <div class="dialog {{#if selected}}selected{{/if}}">
                <div class="dialog-wrapper">
                    <div class="dialog__header">
                        <div class="dialog__header-left">
                            {{{Avatar size='l' src=src}}}
                            <div class="dialog-user-name">
                                {{name}}
                            </div>
                        </div>
                        <time class="dialog-time">{{time}}</time>
                    </div>
                    <div class="dialog__content">
                        <p class="message">{{text}}</p>
                        {{#if unreadCount}}
                            <div class="dialog__unread-badge">
                                <span class="unread-badge">
                                    {{unreadCount}}
                                </span>
                            </div>
                        {{/if}}
                    </div>
                </div>
            </div>
        `;
    }
}
