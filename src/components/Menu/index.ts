import { Block, registerComponent } from 'core';
import { IProfile, Profile } from 'entities/user';
import { MenuItem, UpdateAvatarModal } from './components';
import { Props as PropsMenuItem } from './components/MenuItem';
import userService from 'services/userService';
import store from 'store';

import './styles.scss';

import menu from 'data/menu';

registerComponent(MenuItem);
registerComponent(UpdateAvatarModal);

type Props = {};

type ComponentProps = {
    fullName?: string;
    srcAvatar?: string;
    links?: PropsMenuItem[];
    showModal: boolean;
};

const isActiveLink = (link: string) => {
    return window.location.href.includes(link);
};

const getProfileData = (profile: IProfile) => {
    const profileEntity = new Profile(profile);
    return {
        fullName: profileEntity.fullName,
        srcAvatar: profileEntity.avatar,
    };
};

export default class Menu extends Block<ComponentProps> {
    static componentName = 'Menu';

    constructor(props: Props) {
        const defaultProps: ComponentProps = {
            showModal: false,
        };

        super(Object.assign(defaultProps, props));

        const links: PropsMenuItem[] = menu.links.map(link => ({
            ...link,
            active: isActiveLink(link.link),
        }));

        const { profile } = userService();

        this.setProps({
            ...getProfileData(profile),
            links: links,
            logoutHandler: this.logoutHandler.bind(this),
            onCloseHandler: this.onCloseHandler.bind(this),
            onShowModal: this.onShowModal.bind(this),
        });
    }

    logoutHandler() {
        const { logout } = userService();

        logout();
    }

    componentDidMount() {
        store.subscribe(state => {
            this.setProps({
                ...getProfileData(state.profile),
            });
        }, 'PROFILE');
    }

    onShowModal() {
        this.setProps({
            showModal: true,
        });
    }

    onCloseHandler() {
        this.setProps({
            showModal: false,
        });
    }

    render() {
        return `
            <div class='menu'>
                <div class='menu-profile'>
                    {{#if showModal}}
                        {{{UpdateAvatarModal onClose=onCloseHandler}}}
                    {{/if}}
                    <div class='menu-profile-avatar'>
                        {{{Avatar src=srcAvatar size='xxl'}}}
                        <div class='menu-profile-avatar__change'>
                            <div class='menu-profile-avatar__change-content'>
                                {{{Button color="ghost" content="Change avatar" onClick=onShowModal}}}
                            </div>
                        </div>
                    </div>
                    <span class='menu-profile-name'>{{fullName}}</span>
                </div>
                <nav class='links-container'>
                    <ul class='links'>
                        {{#each links}}
                            {{{MenuItem
                                link=this.link
                                title=this.title
                                active=this.active
                                icon=this.icon
                            }}}
                        {{/each}}
                    </ul>
                </nav>
                <div class='menu-profile__logout-btn'>
                    {{{Button content="Logout" onClick=logoutHandler color="ghost" format="link"}}}
                </div>
            </div>
        `;
    }
}
