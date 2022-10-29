import { CreateDialogData } from 'controllers/ChatController';
import { Block } from 'core';
import { FormHelper } from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { checkValidators } from 'utils/validators/checkValidators';
import { Require } from 'utils/validators/Require';
import { chatTitleValidators, messages } from 'utils/validators/validators';

type Props = {
    onClose?: () => void;
    onSubmit?: (values: CreateDialogData) => void;
};

type ComponentProps = Props & {
    events?: {
        submit?: (e: SubmitEvent) => void;
    };
    validators?: Record<string, (value: string) => string | undefined>;
    defaultValues?: Record<string, string>;
    errors?: Record<string, string>;
};

export default class NewChatModal extends Block<ComponentProps> {
    static componentName = 'NewChatModal';

    constructor(props: Props) {
        super(props);

        this.setProps({
            events: {
                submit: this.onSubmitHandler.bind(this),
            },
            validators: {
                title: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...chatTitleValidators(),
                ]),
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

        this.props.onSubmit && this.props.onSubmit(formValues as CreateDialogData);
    }

    render() {
        return `
            <div class='modal-container'>
                <div class='modal'>
                    <div class="modal-close-btn">
                        {{{Button color="ghost" content="&times;" onClick=onClose}}}
                    </div>
                    <div class='modal-content'>
                        <h3>New chat</h3>
                        <form>
                            <div class="form-fields">
                                {{{InputField
                                    name="title"
                                    label="Search by title"
                                    error=errors.title
                                    defaultValue=defaultValues.title 
                                }}}
                            </div>
                            {{{Button type="submit" content="Create chat"}}}
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}
