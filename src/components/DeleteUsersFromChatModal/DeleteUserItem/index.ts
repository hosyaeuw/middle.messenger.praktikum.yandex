import { Block } from 'core';
import { Profile } from 'entities/user';
import router from 'router';
import chatService from 'services/chatService';

import './styles.scss';

type Props = {
    profile: Profile;
    onClick: () => void;
    events?: {
        click?: () => void;
    };
};

type ComponentProps = Props & {};

export default class DeleteUserItem extends Block<ComponentProps> {
    static componentName = 'DeleteUserItem';

    constructor(props: ComponentProps) {
        super(props);

        this.setProps({
            fullName: this.props.profile.fullName,
            avatar: this.props.profile.avatar,
            role: this.props.profile.role,
            onClickHandler: this.onClickHandler.bind(this),
        });
    }

    onClickHandler() {
        const { deleteUsersFromChat } = chatService();

        const { id } = router.getParams();
        if (id) {
            deleteUsersFromChat({
                users: [this.props.profile.id],
                chatId: +id,
            }).then(() => {
                this.props.onClick && this.props.onClick();
            });
        }
    }

    render() {
        return `
            <li class="delete-user-item">
                <div class="delete-user-item__profile">
                    {{{Avatar size="l" src=avatar}}}
                    <div class="delete-user-item__info">
                        <span>{{fullName}}</span>
                        <span>{{role}}</span>
                    </div>
                </div>
                <div class="delete-user-item__btn">
                    {{{Button color="ghost" content="&times;" onClick=onClickHandler}}}
                </div>
            </li>
        `;
    }
}
