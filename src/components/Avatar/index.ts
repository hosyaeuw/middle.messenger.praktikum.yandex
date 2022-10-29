import { Block } from 'core';
import './styles.scss';

type Sizes = 'm' | 'l' | 'xl' | 'xxl';

type Props = {
    src: string;
    size?: Sizes;
};

export default class Avatar extends Block<Props> {
    static componentName = 'Avatar';

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
