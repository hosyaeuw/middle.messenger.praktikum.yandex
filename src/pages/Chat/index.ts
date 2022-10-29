import store from 'store';
import router from 'router';
import { Block, registerComponent } from 'core';
import chatService from 'services/chatService';
import { OpenChatStore } from 'store/chatStore';
import { Opponent } from 'entities/user';
import { MessageType } from 'entities/message';
import { DialogType } from 'entities/dialog';
import { DialogList, MessageList, NewMessageForm, NewChatButton, ChatMenu } from './components';

import './styles.scss';

registerComponent(DialogList);
registerComponent(MessageList);
registerComponent(NewMessageForm);
registerComponent(NewChatButton);
registerComponent(ChatMenu);

type Props = {};

type OpenChat = {
    srcAvatar: string;
    opponentFullName: string;
    messages: MessageType[];
};

type ComponentProps = Props & {
    title: string;
    dialogs: DialogType[];
    openChat: OpenChat | null;
};

const generateOpenChat = (openChat: OpenChatStore): OpenChat | null => {
    if (openChat) {
        const opponent = new Opponent(openChat.opponent[0]);

        return {
            opponentFullName: opponent.fullName,
            messages: openChat.messages,
            srcAvatar: opponent.avatar,
        };
    }

    return null;
};

const requestChat = (chatId: string | null) => {
    if (!chatId) {
        return;
    }

    const { getToken, connectMessages } = chatService();

    getToken(+chatId).then(token => {
        if (token) {
            connectMessages(token, +chatId);
        }
    });
};

export default class Chat extends Block<ComponentProps> {
    static componentName = 'Chat';

    constructor() {
        super();
        const { id } = router.getParams();

        const { dialogs, openChat } = chatService();

        this.setProps({
            title: 'Chats',
            dialogs,
            openChat: generateOpenChat(openChat),
            onSubmitHandler: this.onSubmitHandler,
        });

        requestChat(id);
    }

    componentDidMount() {
        store.subscribe(state => {
            this.setProps({
                dialogs: state.dialogs,
            });
        }, 'Chat');

        store.subscribe(state => {
            this.setProps({
                openChat: generateOpenChat(state.openChat),
            });
        }, 'Messages');

        const { fetchDialogs } = chatService();
        fetchDialogs();
    }

    onSubmitHandler(values: any) {
        const { sendMessage } = chatService();
        sendMessage(values);
    }

    render() {
        return `
            {{#MainLayout}}
                <div class='chat'>
                    <div class='chat-dialogs'>
                        <div class='header'>
                            <h1 class='header-title'>{{title}}</h1>
                            <div class='header__button-wrapper'>
                                {{{NewChatButton}}}
                            </div>
                        </div>
                        <div class='search'>
                            <div class='search__input-wrapper'>
                                {{{InputField name='search' placeholder='Search'}}}
                            </div>
                        </div>
                        {{{DialogList dialogs=dialogs}}}
                    </div>
                    {{#if openChat}}
                        <div class='chat-dialog'>
                            <div class='chat-dialog-header'>
                                <div class='chat-dialog-header__info'>
                                    {{{Avatar size='l' src=openChat.srcAvatar}}}
                                    <div>
                                        <span class='name'>{{openChat.opponentFullName}}</span>
                                    </div>
                                </div>
                                <div class='chat-dialog-header__button-container'>
                                    {{{ChatMenu}}}
                                </div>
                            </div>
                            <div class='messages-block'>
                                {{{MessageList messages=openChat.messages}}}
                                {{{NewMessageForm onSubmit=onSubmitHandler}}}
                            </div>
                        </div>                        
                    {{/if}}
                </div>
            {{/MainLayout}}
        `;
    }
}
