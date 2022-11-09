import { Block } from 'core';

type Props = {};

export default class Page404 extends Block<Props> {
    static componentName = 'Page404';

    constructor() {
        super();
    }

    render() {
        return `
            {{{ErrorPage title="404" description="this page does not exist"}}}
        `;
    }
}
