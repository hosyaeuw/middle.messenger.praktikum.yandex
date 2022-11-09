import { Block } from 'core';

import './styles.scss';

type Props = {};

export default class FormFields extends Block<Props> {
    static componentName = 'FormFields';

    constructor(props: Props) {
        super(props);
    }

    render() {
        return `
            <div class='form-fields' data-layout=1>
            </div>
        `;
    }
}
