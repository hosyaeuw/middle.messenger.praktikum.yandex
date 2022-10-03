import { Block } from 'core';
import './styles.scss';

type sizes = 'm' | 'l' | 'xl' | 'xxl';

type Props = {
    src: string;
    size?: sizes;
};

export default class Avatar extends Block<Props> {
    constructor(props: Props) {
        const defaultProps: Props = {
            src: '#',
            size: 'm',
        };

        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <div class='avatar-container avatar_size-{{size}}'>
                <img class='avatar' src={{src}} alt='avatar' />
            </div>
        `;
    }
}
