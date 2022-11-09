import { SearchUserData } from 'controllers/UserController';
import { Block, registerComponent } from 'core';
import { router } from 'router';
import { chatService } from 'services/chatService';
import ChatMenuItem from './ChatMenuItem';

import './styles.scss';

registerComponent(ChatMenuItem);

type MenuItem = {
    title: string;
    onClick: () => void;
};

type Props = {};

type ComponentProps = Props & {
    menuItems: MenuItem[];
    showMenu: boolean;
};

export default class ChatMenu extends Block<ComponentProps> {
    static componentName = 'ChatMenu';

    constructor() {
        super();

        const menuItems: MenuItem[] = [
            {
                title: 'Добавить участника',
                onClick: this.onAddClickHandler.bind(this),
            },
            {
                title: 'Удалить участника',
                onClick: this.onDeleteClickHandler.bind(this),
            },
        ];

        this.setProps({
            toggleShowMenu: this.toggleShowMenu.bind(this),
            menuItems: menuItems,
            showAddUserModal: false,
            showDeleteUsersModal: false,
            onCloseAddModal: this.onCloseAddModal.bind(this),
            onAddUsersSubmit: this.onAddUsersSubmit.bind(this),
            onCloseDeleteModal: this.onCloseDeleteModal.bind(this),
        });
    }

    onShowMenuHandler() {
        this.setProps({
            showMenu: true,
        });
    }

    onCloseMenuHandler() {
        this.setProps({
            showMenu: false,
        });
    }

    onAddClickHandler() {
        this.setProps({
            showAddUserModal: true,
        });
    }

    onDeleteClickHandler() {
        this.setProps({
            showDeleteUsersModal: true,
        });
    }

    onAddUsersSubmit(values: SearchUserData) {
        const { searchAndAddUsers } = chatService();

        const { id } = router.getParams();
        if (id) {
            searchAndAddUsers(values, +id).then(() => {
                this.onCloseAddModal();
            });
        }
    }

    onCloseAddModal() {
        this.setProps({
            showAddUserModal: false,
        });
    }

    onCloseDeleteModal() {
        this.setProps({
            showDeleteUsersModal: false,
        });
    }

    toggleShowMenu() {
        if (this.props.showMenu) {
            this.onCloseMenuHandler();
        } else {
            this.onShowMenuHandler();
        }
    }

    render() {
        return `
            <div class="chat-menu-container">
                {{{Button content='+' onClick=toggleShowMenu}}}
                {{#if showMenu}}
                    <ul class="chat-menu">
                        {{#each menuItems}}
                            {{{ChatMenuItem onClick=this.onClick title=this.title}}}
                        {{/each}}
                    </ul>
                {{/if}}
                {{#if showAddUserModal}}
                    {{{AddUsersToChatModal onClose=onCloseAddModal onSubmit=onAddUsersSubmit}}}
                {{/if}}
                {{#if showDeleteUsersModal}}
                    {{{DeleteUsersFromChatModal onClose=onCloseDeleteModal}}}
                {{/if}}
            </div>
        `;
    }
}
