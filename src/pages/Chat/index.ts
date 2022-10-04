import { Block, registerComponent } from 'core';
import { Opponent } from 'entities/user';
import { DialogList, MessageList, NewMessageForm } from './components';
import { TMessage } from 'entities/message';
import { TDialog } from 'entities/dialog';

import './styles.scss';

import openChat from 'data/openChat';
import chats from 'data/chats';

registerComponent(DialogList);
registerComponent(MessageList);
registerComponent(NewMessageForm);

type Props = {};

type ComponentProps = Props & {
    title: string;
    srcAvatar: string;
    opponentFullName: string;
    messages: TMessage[];
    dialogs: TDialog[];
};

export default class Chat extends Block<ComponentProps> {
    static componentName = 'Chat';

    constructor() {
        super();

        this.setProps({
            title: 'Chats',
            srcAvatar: new Opponent(openChat.opponent).user.avatar,
            opponentFullName: new Opponent(openChat.opponent).fullName,
            messages: openChat.messages,
            dialogs: chats.dialogs,
        });
    }

    render() {
        return `
            {{#MainLayout}}
                <div class='chat'>
                    <div class='chat-dialogs'>
                        <div class='header'>
                            <h1 class='header-title'>{{title}}</h1>
                            <div class='header__button-wrapper'>
                                {{{Button content='+ Create new chat'}}}
                            </div>
                        </div>
                        <div class='search'>
                            <div class='search__input-wrapper'>
                                {{{InputField name='search' placeholder='Search'}}}
                            </div>
                        </div>
                        {{{DialogList dialogs=dialogs}}}
                    </div>
                    <div class='chat-dialog'>
                        <div class='header'>
                            {{{Avatar size='l' src=srcAvatar}}}
                            <div>
                                <span class='name'>{{opponentFullName}}</span>
                            </div>
                        </div>
                        <div class='messages-block'>
                            {{{MessageList messages=messages}}}
                            {{{NewMessageForm}}}
                        </div>
                    </div>
                </div>
            {{/MainLayout}}
        `;
    }
}
