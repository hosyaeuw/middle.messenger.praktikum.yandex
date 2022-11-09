import { Block } from 'core';

import './styles.scss';

type Props = {};

export default class DialogListEmpty extends Block<Props> {
    static componentName = 'DialogListEmpty';

    constructor(props: Props) {
        super(props);
    }

    render() {
        return `
            <div class="dialog-list-empty">
                you don't have any dialogue
            </div>
        `;
    }
}
