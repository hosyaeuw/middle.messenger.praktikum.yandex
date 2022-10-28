import { Block } from 'core';

type Props = {
    title: string;
    onClick: () => void;
    events?: {
        click?: () => void;
    };
};

type ComponentProps = Props & {};

export default class ChatMenuItem extends Block<ComponentProps> {
    static componentName = 'ChatMenuItem';

    constructor(props: Props) {
        props.events = {};
        props.events.click = props.onClick;
        super(props);
    }

    render() {
        return `
            <li class="chat-menu__item">{{title}}</li>
        `;
    }
}
