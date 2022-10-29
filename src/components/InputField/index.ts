import { InputTypes } from 'components/Input';
import { Block } from 'core';
import './styles.scss';

type Props = {
    type?: InputTypes;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    underline?: boolean;
    name?: string;
    error?: string;
    onChange?: (e: Event) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    validator?: (value: string) => string | undefined;
};

export default class InputField extends Block<Props> {
    static componentName = 'InputField';

    constructor(props: Props) {
        const defaultProps: Props = {
            type: 'text',
            placeholder: props.label ? ' ' : '',
        };

        super(Object.assign(defaultProps, props));

        this.setProps({
            onFocusHandler: this.onFocusHandler.bind(this),
            onBlurHandler: this.onBlurHandler.bind(this),
        });

        if (props.error) {
            this.refs.errorRef.setProps({
                text: props.error,
            });
        }
    }

    onBlurHandler(e: DOMEvent<HTMLInputElement>) {
        this.setValidator(e.target.value);
    }

    onFocusHandler(e: DOMEvent<HTMLInputElement>) {
        this.setValidator(e.target.value);
    }

    setValidator(value: string) {
        if (this.props.validator) {
            this.refs.errorRef.setProps({
                text: this.props.validator(value),
            });
        }
    }

    render() {
        return `
            <div>
                <div class="input-container {{#if label}}input-container_with-label{{/if}}">
                    {{{Input 
                        placeholder=placeholder 
                        underline=underline 
                        name=name 
                        type=type 
                        onBlur=onBlurHandler
                        defaultValue=defaultValue
                        onFocus=onFocusHandler
                        onChange=onChange
                    }}}
                    <label class="input-label">{{label}}</label>
                </div>
                {{{Error ref='errorRef'}}}
            </div>
        `;
    }
}
