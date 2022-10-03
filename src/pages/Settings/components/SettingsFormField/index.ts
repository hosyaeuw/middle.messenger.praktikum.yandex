import { Block } from 'core';

type Props = {
    title: string;
};

export default class SettingsFormField extends Block<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return `
            <div class="form-field">
                <span>{{title}}</span>
                <div class="form-field__input" data-layout=1>
                </div>
            </div>
        `;
    }
}
