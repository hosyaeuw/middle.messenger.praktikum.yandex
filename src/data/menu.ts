import { icons } from 'assets';
import { Path } from 'router';

const json = {
    links: [
        {
            title: 'Chat',
            link: Path.messenger,
            icon: icons.menu.chatIcon,
        },
        {
            title: 'Settings',
            link: Path.settings,
            icon: icons.menu.settingsIcon,
        },
        {
            title: '404',
            link: Path.another,
        },
        {
            title: '500',
            link: Path.serverError,
        },
    ],
};

export default json;
