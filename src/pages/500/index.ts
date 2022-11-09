import { Block } from 'core';

type Props = {};

export default class ServerErrorPage extends Block<Props> {
    static componentName = 'ServerErrorPage';

    constructor() {
        super();
    }

    render() {
        return `
            {{{ErrorPage title="500" description="We already know about the problem and are trying to solve it"}}}
        `;
    }
}
