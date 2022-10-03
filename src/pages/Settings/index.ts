import { Block, registerComponent } from 'core';
import { PasswordForm, ProfileForm, SettingsFormField } from './components';

registerComponent(ProfileForm);
registerComponent(PasswordForm);
registerComponent(SettingsFormField);

import './styles.scss';

type Props = {};

export default class Settings extends Block<Props> {
    constructor() {
        super();
    }

    render() {
        return `
            {{#MainLayout}}
                <div class='settings'>
                    <h1 class='header-title'>{{title}}</h1>
                    {{{ProfileForm}}}
                    {{{PasswordForm}}}
                </div>
            {{/MainLayout}}
        `;
    }
}
