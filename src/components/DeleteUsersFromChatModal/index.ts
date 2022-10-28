import { Block, registerComponent } from 'core';
import { Profile } from 'entities/user';
import router from 'router';
import chatService from 'services/chatService';
import userService from 'services/userService';
import DeleteUserItem from './DeleteUserItem';

import './styles.scss';

registerComponent(DeleteUserItem);

type Props = {
    onClose: () => void;
};

type ComponentProps = Props & {
    chatUsers: Profile[];
    onClickDeleteUserHandler: () => void;
};

export default class DeleteUsersFromChatModal extends Block<ComponentProps> {
    static componentName = 'DeleteUsersFromChatModal';

    constructor(props: ComponentProps) {
        super(props);

        this.setProps({
            chatUsers: [],
            onClickDeleteUserHandler: this.onClickDeleteUserHandler.bind(this),
        });
    }

    fetchUsers() {
        const { id } = router.getParams();
        if (id) {
            const { fetchUsersFromChat } = chatService();
            const { profile } = userService();

            return fetchUsersFromChat(id).then(data => {
                const chatUsers = data.filter(user => user.id !== profile.id);
                this.setProps({ chatUsers });
            });
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    onClickDeleteUserHandler() {
        const response = this.fetchUsers();
        if (response) {
            response.then(() => {
                if (this.props.chatUsers.length === 0) {
                    this.props.onClose();
                }
            });
        }
    }

    render() {
        return `
            <div class='modal-container'>
                <div class='modal'>
                    <div class="modal-close-btn">
                        {{{Button color="ghost" content="&times;" onClick=onClose}}}
                    </div>
                    <div class='modal-content'>
                        <h3>Delete users</h3>
                        <ul class="delete-user-list">
                            {{#each chatUsers}}
                                {{{DeleteUserItem profile=this onClick=../onClickDeleteUserHandler}}}
                            {{/each}}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}
