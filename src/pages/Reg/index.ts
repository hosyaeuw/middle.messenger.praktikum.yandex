import { RegData } from 'controllers/AuthController';
import { Block } from 'core';
import { Path } from 'router';
import userService from 'services/userService';
import convertingDataToSend from 'utils/convertingDataToSend';
import FormHelper from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { Require } from 'utils/validators';
import { checkValidators } from 'utils/validators/checkValidators';
import {
    emailValidators,
    loginValidators,
    messages,
    nameValidators,
    passwordValidators,
    phoneValidators,
} from 'utils/validators/validators';

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
                email: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...emailValidators(),
                ]),
                firstName: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...nameValidators(),
                ]),
                secondName: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...nameValidators(),
                ]),
                phone: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...phoneValidators(),
                ]),
                password: FormHelper.validate(passwordValidators()),
                passwordAgain: FormHelper.validate(passwordValidators()),
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

        const { registration } = userService();

        registration(convertingDataToSend(formValues) as RegData);
    }

    render() {
        return `
            {{#FormLayout formTitle="Registration" onSubmit=onSubmitHandler}}
                <div class="form-fields">
                    {{{InputField
                        validator=validators.email
                        underline="true" 
                        label="Email"
                        name="email"
                        error=errors.email
                        defaultValue=defaultValues.email
                    }}}
                    {{{InputField
                        validator=validators.login
                        underline="true" 
                        label="Login" 
                        name="login"
                        error=errors.login
                        defaultValue=defaultValues.login
                    }}}
                    {{{InputField
                        validator=validators.firstName
                        underline="true" 
                        label="First Name" 
                        name="firstName"
                        error=errors.firstName
                        defaultValue=defaultValues.firstName
                    }}}
                    {{{InputField
                        validator=validators.secondName
                        underline="true" 
                        label="Second Name" 
                        name="secondName"
                        error=errors.secondName
                        defaultValue=defaultValues.secondName
                    }}}
                    {{{InputField
                        validator=validators.phone
                        underline="true" 
                        label="Phone" 
                        name="phone"
                        error=errors.phone
                        defaultValue=defaultValues.phone
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
                    {{{InputField
                        validator=validators.password
                        underline="true" 
                        label="Password (again)" 
                        type="password"
                        name="passwordAgain" 
                        error=errors.passwordAgain
                        defaultValue=defaultValues.passwordAgain
                    }}}
                </div>
                {{{Button type="submit" content="Create account"}}}
                <div>
                    <span>Have an account?</span>
                    <a href=${Path.login}>Login</a>
                </div>
            {{/FormLayout}}
        `;
    }
}
