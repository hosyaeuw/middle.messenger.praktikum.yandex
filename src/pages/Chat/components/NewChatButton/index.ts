import { CreateDialogData } from 'controllers/ChatController';
import { SearchUserData } from 'controllers/UserController';
import { Block, registerComponent } from 'core';
import router, { Path } from 'router';
import chatService from 'services/chatService';
import NewChatModal from '../NewChatModal';

registerComponent(NewChatModal);

type Props = {};

type ComponentProps = Props & {
    onShowNewChatModal: () => void;
    showNewChatModal: boolean;
    showAddUsersModal: boolean;
    chatId: number;
};

export default class NewChatButton extends Block<ComponentProps> {
    static componentName = 'NewChatButton';

    constructor() {
        super();

        this.setProps({
            onShowNewChatModal: this.onShowNewChatModal.bind(this),
            onCloseNewChatModal: this.onCloseNewChatModal.bind(this),
            onShowAddUsersModal: this.onShowAddUsersModal.bind(this),
            onCloseAddUsersModal: this.onCloseAddUsersModal.bind(this),
            onNewChatSubmit: this.onNewChatSubmit.bind(this),
            onAddUsersSubmit: this.onAddUsersSubmit.bind(this),
        });
    }

    onShowNewChatModal() {
        this.setProps({
            showNewChatModal: true,
        });
    }

    onCloseNewChatModal() {
        this.setProps({
            showNewChatModal: false,
        });
    }

    onShowAddUsersModal() {
        this.setProps({
            showAddUsersModal: true,
        });
    }

    onCloseAddUsersModal() {
        this.setProps({
            showAddUsersModal: false,
        });
    }

    onNewChatSubmit(values: CreateDialogData) {
        const { createDialog } = chatService();

        createDialog(values).then(data => {
            this.setProps({
                chatId: data.id,
            });
            this.onCloseNewChatModal();
            this.onShowAddUsersModal();
        });
    }

    onAddUsersSubmit(values: SearchUserData) {
        const { searchAndAddUsers } = chatService();

        searchAndAddUsers(values, this.props.chatId).then(() => {
            this.onCloseAddUsersModal()
            router.go(`${Path.messenger}/${this.props.chatId}`);
        });
    }

    render() {
        return `
            <div>
                {{{Button content='+ Create new chat' onClick=onShowNewChatModal}}}
                {{#if showNewChatModal}}
                    {{{NewChatModal onClose=onCloseNewChatModal onSubmit=onNewChatSubmit}}}
                {{/if}}
                {{#if showAddUsersModal}}
                    {{{AddUsersToChatModal onClose=onCloseAddUsersModal onSubmit=onAddUsersSubmit}}}
                {{/if}}
            </div>
        `;
    }
}
