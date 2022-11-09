import { Block } from 'core';
import './styles.scss';

type Colors = 'blue' | 'ghost';
type Formats = 'rect' | 'circle' | 'link';

type Props = {
    content?: string | Block;
    type?: string;
    color?: Colors;
    format?: Formats;
    disabled?: boolean;
    onClick?: () => void;
    events?: {
        click?: () => void;
    };
};

export default class Button extends Block<Props> {
    static componentName = 'Button';

    constructor(props: Props) {
        const defaultProps: Props = {
            color: 'blue',
            type: 'button',
            format: 'rect',
            content: 'Button',
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
            <button
                class="button button_{{color}} button_{{format}}"
                {{#if disabled}}
                    disabled
                {{/if}}
                type="{{type}}"
            >
                {{{content}}}
            </button>
        `;
    }
}
