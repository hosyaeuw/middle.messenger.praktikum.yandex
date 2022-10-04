import { Block, registerComponent } from 'core';
import { Profile } from 'entities/user';
import { MenuItem } from './components';
import { Props as PropsMenuItem } from './components/MenuItem';

import './styles.scss';

registerComponent(MenuItem);

import profile from 'data/profile';
import menu from 'data/menu';

type Props = {};

type ComponentProps = {
    fullName?: string;
    srcAvatar?: string;
    links?: PropsMenuItem[];
};

const isActiveLink = (link: string) => {
    return window.location.href.includes(link);
};

export default class Menu extends Block<ComponentProps> {
    static componentName = 'Menu';

    constructor(props: Props) {
        super(props);

        const profileEntity = new Profile(profile);
        const links: PropsMenuItem[] = menu.links.map(link => ({
            ...link,
            active: isActiveLink(link.link),
        }));

        this.setProps({
            fullName: profileEntity.fullName,
            srcAvatar: profileEntity.avatar,
            links: links,
        });
    }

    render() {
        return `
            <div class='menu'>
                <div class='menu-profile'>
                    <div class='menu-profile-avatar'>
                        {{{Avatar src=srcAvatar size='xxl'}}}
                        <div class='menu-profile-avatar__change'>
                            <div class='menu-profile-avatar__change-content'>
                                <span>Change avatar</span>
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
                {{{MenuItem title="Logout"}}}
            </div>
        `;
    }
}
