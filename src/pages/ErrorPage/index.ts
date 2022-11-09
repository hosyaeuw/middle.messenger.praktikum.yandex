import { Block } from 'core';
import { Path } from 'router';

import './styles.scss';

type Props = {
    title?: string;
    description?: string;
};

export default class ErrorPage extends Block<Props> {
    static componentName = 'ErrorPage';

    constructor(props: Props) {
        super(props);
    }

    render() {
        return `
            <div class="root-error-container">
                <div class="error-page">
                    <span class="error-page-title">{{title}}</span>
                    <span class="error-page-description">{{description}}</span>
                    <a href="${Path.messenger}">back to chat</a>
                </div>
            </div>
        `;
    }
}
