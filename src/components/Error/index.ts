import { Block } from 'core';

import './styles.scss';

type Props = {
    text: string;
};

export default class Error extends Block<Props> {
    static componentName = 'Error';

    render() {
        return `<small class="input-error">{{text}}</small>`;
    }
}
