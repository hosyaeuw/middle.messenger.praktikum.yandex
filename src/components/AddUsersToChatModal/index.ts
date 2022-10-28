import { TSearchUserData } from 'controllers/UserController';
import { Block } from 'core';
import FormHelper from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { Require } from 'utils/validators';
import { checkValidators } from 'utils/validators/checkValidators';
import { loginValidators, messages } from 'utils/validators/validators';

type Props = {
    onClose?: () => void;
    onSubmit?: (values: TSearchUserData) => void;
};

type ComponentProps = Props & {
    events?: {
        submit?: (e: SubmitEvent) => void;
    };
    validators?: Record<string, (value: string) => string | undefined>;
    defaultValues?: Record<string, string>;
    errors?: Record<string, string>;
};

export default class AddUsersToChatModal extends Block<ComponentProps> {
    static componentName = 'AddUsersToChatModal';

    constructor(props: Props) {
        super(props);

        this.setProps({
            events: {
                submit: this.onSubmitHandler.bind(this),
            },
            validators: {
                login: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...loginValidators(),
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

        this.props.onSubmit && this.props.onSubmit(formValues as TSearchUserData);
    }

    render() {
        return `
            <div class='modal-container'>
                <div class='modal'>
                    <div class="modal-close-btn">
                        {{{Button content="&times;" onClick=onClose}}}
                    </div>
                    <div class='modal-content'>
                        <h3>Users</h3>
                        <form>
                            <div class='form-fields'>
                                {{{InputField
                                    name="login"
                                    label="User login"
                                    error=errors.login
                                    defaultValue=defaultValues.login
                                }}}
                            </div>
                            {{{Button type="submit" content="Add user"}}}
                        </form>
                    </div>
                </div>
            </div>
        `;
    }
}
