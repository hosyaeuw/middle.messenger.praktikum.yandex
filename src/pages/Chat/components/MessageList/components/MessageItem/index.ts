import { Block, registerComponent } from 'core';
import Message, { Props as PropsMessage } from '../Message';

import './styles.scss';

registerComponent(Message);

type position = 'start' | 'end';

type Props = PropsMessage & {
    position: position;
};

export default class MessageItem extends Block<Props> {
    static componentName = 'MessageItem';

    constructor(props: Props) {
        super(props);
        this.setProps({
            position: props.isMe ? 'end' : 'start',
        });
    }

    render() {
        return `
            <div class='messages__line messages__line_{{position}}'>
                <div class='message-wrapper'>
                    {{{Message
                        author=this.author
                        text=this.text
                        time=this.time
                        avatar=this.avatar
                        isMe=this.isMe
                    }}}
                </div>
            </div>
        `;
    }
}
