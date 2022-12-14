import { ChangePasswordData } from 'controllers/UserController';
import { Block } from 'core';
import userService from 'services/userService';
import { FormHelper } from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { checkValidators } from 'utils/validators/checkValidators';
import { passwordValidators } from 'utils/validators/validators';

type Props = {
    events?: {
        submit?: (e: SubmitEvent) => void;
    };
};

type ComponentProps = Props & {
    formChanged?: boolean;
    validators?: Record<string, (value: string) => string | undefined>;
    defaultValues?: Record<string, string>;
};

export default class PasswordForm extends Block<ComponentProps> {
    static componentName = 'PasswordForm';

    constructor(props: Props) {
        const defaultProps: ComponentProps = {
            formChanged: false,
        };

        super(Object.assign(defaultProps, props));

        this.setProps({
            onChangeHandler: this.onChangeHandler.bind(this),
            validators: {
                oldPassword: FormHelper.validate(passwordValidators()),
                newPassword: FormHelper.validate(passwordValidators()),
                newPasswordAgain: FormHelper.validate(passwordValidators()),
            },
            events: {
                submit: this.onSubmitHandler.bind(this),
            },
        });
    }

    onDisabledButton(disabled: boolean) {
        this.refs.formButton.setProps({
            disabled: disabled,
        });
    }

    getForm() {
        return this._element!.getElementsByTagName('form')[0];
    }

    onChangeHandler() {
        const formValues = getFormValues(this.getForm());
        if (this.props.validators) {
            const errors = checkValidators(formValues, this.props.validators);
            if (Object.values(errors).some(value => value !== undefined)) {
                this.onDisabledButton(true);
            } else {
                this.onDisabledButton(false);
            }
        } else {
            this.onDisabledButton(true);
        }
    }

    onSubmitHandler(e: SubmitEvent) {
        e.preventDefault();
        e.stopPropagation();

        const formValues = getFormValues(this.getForm());

        if (this.props.validators) {
            const errors = checkValidators(formValues, this.props.validators);

            if (Object.values(errors).some(value => value !== undefined)) {
                this.setProps({
                    errors,
                });

                return;
            }
        }

        const { changePassword } = userService();

        changePassword(formValues as ChangePasswordData).then(() => {
            this.onDisabledButton(true);
        });
    }

    render() {
        return `
            <div>
                <h2>Password</h2>
                <form class='form'>
                    <div class='form__fields'>
                        {{#SettingsFormField title='Old Password'}}
                            {{{InputField 
                                name='oldPassword' 
                                placeholder='********'
                                onChange=onChangeHandler
                                type="password"
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='New Password'}}
                            {{{InputField 
                                name='newPassword' 
                                placeholder='********'
                                onChange=onChangeHandler
                                type="password"
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='New Password Again'}}
                            {{{InputField 
                                name='newPasswordAgain' 
                                placeholder='********'
                                onChange=onChangeHandler
                                type="password"
                            }}}
                        {{/SettingsFormField}}
                    </div>
                    {{{Button 
                        type='submit'
                        content='Save'
                        disabled=${!this.props.formChanged}
                        ref='formButton'
                    }}}
                </form>
            </div>
        `;
    }
}
