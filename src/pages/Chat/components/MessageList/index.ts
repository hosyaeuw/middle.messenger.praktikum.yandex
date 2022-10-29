import { Block, registerComponent } from 'core';
import { MessageType, Message as MessageEntity } from 'entities/message';
import { MessageItem } from './components';
import { Props as PropsMessage } from './components/Message';

registerComponent(MessageItem);

type Props = {
    messages: MessageType[];
    validMessages?: PropsMessage[];
};

const generateValidMessages = (message: MessageType): PropsMessage => {
    const messageEntity = new MessageEntity(message);
    return {
        author: messageEntity.isMe ? 'me' : 'opponent',
        text: messageEntity.text,
        time: messageEntity.timeString,
        avatar: messageEntity.avatar,
        isMe: messageEntity.isMe,
    };
};

export default class MessageList extends Block<Props> {
    static componentName = 'MessageList';

    constructor(props: Props) {
        const defaultProps: Props = {
            messages: [],
        };
        props.validMessages = (props.messages || []).map(generateValidMessages);

        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <div class='messages'>
                {{#each validMessages}}
                    {{{MessageItem
                        author=this.author
                        text=this.text
                        time=this.time
                        avatar=this.avatar
                        isMe=this.isMe
                    }}}
                {{/each}}
            </div>
        `;
    }
}
