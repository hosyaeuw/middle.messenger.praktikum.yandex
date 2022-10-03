import { Block } from 'core';

import './styles.scss';

type messageAuthors = 'me' | 'opponent';

export type Props = {
    author: messageAuthors;
    text: string;
    time: string;
    avatar?: string;
    isMe?: boolean;
};

export default class Message extends Block<Props> {
    constructor(props: Props) {
        const defaultProps: Props = {
            author: 'me',
            text: '',
            time: '',
            avatar: '#',
            isMe: true,
        };

        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <div class='message-container'>
                {{#unless isMe}}
                    <div class='message-avatar'>
                        {{{Avatar src=avatar}}}
                    </div>
                {{/unless}}
                <div>
                    <div class='message message_{{author}}'>
                        <div class='message-text'>
                            <p class='message-text-message'>{{text}}</p>
                        </div>
                    </div>
                    <div class='message-time'>
                        <time class='message-time'>{{time}}</time>
                    </div>
                </div>
            </div>
        `;
    }
}
