import { Block } from 'core';

export type InputTypes = 'text' | 'number' | 'password' | 'email';

type Props = {
    type?: InputTypes;
    placeholder?: string;
    defaultValue?: string;
    name?: string;
    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
    onFocus?: (e: Event) => void;
    events?: {
        input?: (e: Event) => void;
        blur?: (e: FocusEvent) => void;
        focus?: (e: FocusEvent) => void;
    };
};

export default class Input extends Block<Props> {
    static componentName = 'Input';

    constructor(props: Props) {
        props.events = {};
        props.events.blur = e => {
            props.onBlur && props.onBlur(e);
        };
        props.events.focus = e => {
            props.onFocus && props.onFocus(e);
        };
        props.events.input = e => {
            props.onChange && props.onChange(e);
        };

        const defaultProps: Props = {
            type: 'text',
        };

        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <input
                class="input {{#if underline}}input_underline{{/if}} {{#if label}}input_hidden-placeholder{{/if}}"
                name="{{name}}"
                type="{{type}}"
                placeholder="{{placeholder}}"
                {{#if defaultValue}}
                    value="{{defaultValue}}"
                {{/if}}
            />
        `;
    }
}
