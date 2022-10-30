import { store } from 'store';
import { Block, registerComponent } from 'core';
import { chatService } from 'services/chatService';
import { Dialog, DialogType } from 'entities/dialog';
import { DialogList, MessageList, NewMessageForm, NewChatButton, ChatMenu } from './components';
import { router } from 'router';

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
};

type ComponentProps = Props & {
    title: string;
    openChat: OpenChat | null;
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

const generateOpenChat = (openDialog?: DialogType): OpenChat | null => {
    if (openDialog) {
        const dialogEntity = new Dialog(openDialog);
        return {
            opponentFullName: dialogEntity.title,
            srcAvatar: dialogEntity.avatar,
        };
    }

    return null;
};

export default class Chat extends Block<ComponentProps> {
    static componentName = 'Chat';

    constructor(props = {}) {
        const defaultProps = {
            openChat: null,
            title: 'Chats',
            messages: [],
        };
        super(Object.assign(props, defaultProps));

        this.setProps({
            onSubmitHandler: this.onSubmitHandler,
        });
    }

    componentDidMount() {
        const { id } = router.getParams();

        requestChat(id);

        store.subscribe(state => {
            if (id) {
                this.setProps({
                    openChat: generateOpenChat(
                        state.dialogs.find((dialog: DialogType) => dialog.id === +id),
                    ),
                });
            }
        }, 'OpenChat');

        store.subscribe(state => {
            this.setProps({
                messages: state.messages,
            });
        }, 'Messages');
    }

    onSubmitHandler(values: any) {
        const { sendMessage, fetchDialogs } = chatService();
        sendMessage(values);
        fetchDialogs();
    }

    componentDestroy() {
        const { clearMessages } = chatService();

        clearMessages();
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
                        {{{DialogList}}}
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
                                {{{MessageList messages=messages}}}
                                {{{NewMessageForm onSubmit=onSubmitHandler}}}
                            </div>
                        </div>                        
                    {{/if}}
                </div>
            {{/MainLayout}}
        `;
    }
}
