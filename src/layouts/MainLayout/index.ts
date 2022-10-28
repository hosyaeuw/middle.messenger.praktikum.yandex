import { Block } from 'core';
import './styles.scss';

type Props = {};

export default class MainLayout extends Block<Props> {
    static componentName = 'MainLayout';

    constructor() {
        super();
    }

    render() {
        return `
            <main class="main-container">
                {{{Menu}}}
                <div class="main-content" data-layout=1></div>
            </main>
        `;
    }
}
