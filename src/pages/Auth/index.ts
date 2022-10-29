import { LoginData } from 'controllers/AuthController';
import { Block } from 'core';
import { Path } from 'router';
import userService from 'services/userService';
import { convertingDataToSend } from 'utils/convertingDataToSend';
import { FormHelper } from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { checkValidators } from 'utils/validators/checkValidators';
import { Require } from 'utils/validators/Require';
import { loginValidators, messages, passwordValidators } from 'utils/validators/validators';

type Props = {};

type ComponentProps = Props & {
    validators?: Record<string, (value: string) => string | undefined>;
    defaultValues?: Record<string, string>;
};

export default class Auth extends Block<ComponentProps> {
    static componentName = 'Auth';

    constructor() {
        super();

        this.setProps({
            onSubmitHandler: this.onSubmitHandler.bind(this),
            validators: {
                login: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...loginValidators(),
                ]),
                password: FormHelper.validate(passwordValidators()),
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

        const { login } = userService();

        login(convertingDataToSend(formValues) as LoginData);
    }

    render() {
        return `
            {{#FormLayout formTitle="Login" onSubmit=onSubmitHandler}}
                <div class="form-fields">
                    {{{InputField
                        validator=validators.login
                        underline="true" 
                        label="Login" 
                        name="login" 
                        error=errors.login
                        defaultValue=defaultValues.login 
                    }}}
                    {{{InputField
                        validator=validators.password
                        underline="true" 
                        label="Password" 
                        type="password" 
                        name="password" 
                        error=errors.password
                        defaultValue=defaultValues.password 
                    }}}
                </div>
                {{{Button type="submit" content="Sign in"}}}
                <div>
                    <span>No account?</span>
                    <a href=${Path.registration}>Create one</a>
                </div>
            {{/FormLayout}}
        `;
    }
}
