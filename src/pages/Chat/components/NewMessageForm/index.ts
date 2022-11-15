import { Block } from 'core';
import { getFormValues } from 'utils/getFormValues';
import { checkValidators } from 'utils/validators/checkValidators';
import { FormHelper } from 'utils/FormHelper';
import { messageValidators } from 'utils/validators/validators';
import { icons } from 'assets';

import './styles.scss';

type Props = {
    onSubmit?: (values: any) => void;
};

type ComponentProps = Props & {
    validators?: Record<string, (value: string) => string | undefined>;
    defaultValues?: Record<string, string>;
};

export default class NewMessageForm extends Block<ComponentProps> {
    static componentName = 'NewMessageForm';

    constructor(props: Props) {
        super(props);

        this.setProps({
            events: {
                submit: this.onSubmitHandler.bind(this),
            },
            validators: {
                message: FormHelper.validate(messageValidators()),
            },
        });
    }

    getForm() {
        return this._element!.getElementsByTagName('form')[0];
    }

    onSubmitHandler(e: SubmitEvent) {
        e.preventDefault();
        e.stopPropagation();

        const formValues = getFormValues(this.getForm());

        if (this.props.validators) {
            const errors = checkValidators(formValues, this.props.validators);
            if (Object.values(errors).some(value => value !== undefined)) {
                this.setProps({
                    defaultValues: formValues,
                    errors,
                });

                return;
            }
        }

        this.props.onSubmit && this.props.onSubmit(formValues);
    }

    render() {
        return `
            <div>
                <form class='new-message-form'>
                    <div class='new-message-form__content'>
                        {{{Button content='+' format='circle'}}}
                        <div class='new-message-form__input-container'>
                            {{{InputField 
                                validator=validators.message 
                                name='message' 
                                placeholder='Type a message here'
                                error=errors.message
                                defaultValue=defaultValues.message
                            }}}
                        </div>
                        {{{Button 
                            color='ghost' 
                            format='circle'
                            content='<img src="${icons.chat.smileIcon}"/>'
                        }}}
                        <span class='new-message-form__button-container'>
                            {{{Button 
                                format='circle' 
                                type='submit' 
                                content='<img src="${icons.chat.cursorIcon}"/>'
                            }}}
                        </span>
                    </div>
                </form>
            </div>
        `;
    }
}
