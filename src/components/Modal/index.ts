import { Block } from 'core';
import './styles.scss';

type Props = {};

export default class Modal extends Block<Props> {
    static componentName = 'Modal';

    constructor() {
        super();
    }

    render() {
        return `
            <div class='modal-container'>
                <div class='modal'>
                    <button class='modal-close-btn'>&times;</button>
                    <div data-layout=1></div>
                </div>
            </div>
        `;
    }
}