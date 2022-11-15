import { Block } from 'core';
import { Profile } from 'entities/user';
import userService from 'services/userService';

import { checkValidators } from 'utils/validators/checkValidators';
import { FormHelper } from 'utils/FormHelper';
import { getFormValues } from 'utils/getFormValues';
import { isEqualObj } from 'utils/isEqual';
import {
    displayNameValidators,
    emailValidators,
    loginValidators,
    messages,
    nameValidators,
    phoneValidators,
} from 'utils/validators/validators';
import { ChangeProfileData } from 'controllers/UserController';
import { store } from 'store';
import { convertingDataToSend } from 'utils/convertingDataToSend';
import { Require } from 'utils/validators/Require';

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

const generateDefaultValues = (profile: any) => {
    const profileEntity = new Profile(profile);

    return {
        email: profileEntity.email,
        login: profileEntity.login,
        firstName: profileEntity.firstName,
        secondName: profileEntity.secondName,
        displayName: profileEntity.displayName,
        phone: profileEntity.phone,
    };
};

export default class ProfileForm extends Block<ComponentProps> {
    static componentName = 'ProfileForm';

    constructor(props: Props) {
        const defaultProps: ComponentProps = {
            formChanged: false,
        };
        super(Object.assign(defaultProps, props));

        const { profile } = userService();

        this.setProps({
            onChangeHandler: this.onChangeHandler.bind(this),
            events: {
                submit: this.onSubmitHandler.bind(this),
            },
            defaultValues: generateDefaultValues(profile),
            validators: {
                email: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...emailValidators(),
                ]),
                login: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...loginValidators(),
                ]),
                firstName: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...nameValidators(),
                ]),
                secondName: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...nameValidators(),
                ]),
                displayName: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...displayNameValidators(),
                ]),
                phone: FormHelper.validate([
                    new Require({ msg: messages.require }),
                    ...phoneValidators(),
                ]),
            },
        });
    }

    componentDidMount() {
        store.subscribe(state => {
            this.setProps({
                defaultValues: generateDefaultValues(state.profile),
            });
        }, 'Profile');
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
                    errors,
                });

                return;
            }
        }

        const { changeProfile } = userService();

        changeProfile(convertingDataToSend(formValues) as ChangeProfileData).then(() => {
            this.onDisabledButton(true);
        });
    }

    onDisabledButton(disabled: boolean) {
        this.refs.formButton.setProps({
            disabled: disabled,
        });
    }

    onChangeHandler() {
        const formValues = getFormValues(this.getForm());

        if (this.props.defaultValues) {
            if (!isEqualObj(formValues, this.props.defaultValues)) {
                this.onDisabledButton(false);
            } else {
                this.onDisabledButton(true);
            }
        }
    }

    render() {
        return `
            <div>
                <h2>Profile</h2>
                <form class='form'>
                    <div class='form__fields'>
                        {{#SettingsFormField title='Email'}}
                            {{{InputField
                                defaultValue=defaultValues.email
                                name='email'
                                placeholder='Enter email'
                                onChange=onChangeHandler
                                error=errors.email
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='Login'}}
                            {{{InputField 
                                defaultValue=defaultValues.login
                                name='login' 
                                onChange=onChangeHandler
                                placeholder='Enter login'
                                error=errors.login
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='First Name'}}
                            {{{InputField 
                                defaultValue=defaultValues.firstName
                                name='firstName' 
                                onChange=onChangeHandler
                                placeholder='Enter first name'
                                error=errors.firstName
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='Second Name'}}
                            {{{InputField 
                                defaultValue=defaultValues.secondName 
                                name='secondName' 
                                onChange=onChangeHandler
                                placeholder='Enter second name'
                                error=errors.secondName
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='Display Name'}}
                            {{{InputField 
                                defaultValue=defaultValues.displayName
                                name='displayName' 
                                onChange=onChangeHandler
                                placeholder='Enter display name'
                                error=errors.displayName
                            }}}
                        {{/SettingsFormField}}
                        {{#SettingsFormField title='Phone'}}
                            {{{InputField 
                                defaultValue=defaultValues.phone
                                name='phone' 
                                onChange=onChangeHandler
                                placeholder='Enter phone'
                                error=errors.phone
                            }}}
                        {{/SettingsFormField}}
                    </div>
                    {{{Button
                        ref='formButton'
                        type='submit'
                        content='Save'
                        disabled=${!this.props.formChanged}
                    }}}
                </form>
            </div>
        `;
    }
}
