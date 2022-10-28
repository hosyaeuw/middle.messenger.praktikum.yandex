import { Path } from 'router';

const json = {
    links: [
        {
            title: 'Chat',
            link: Path.chat,
            icon: 'assets/icons/menu/chat.png',
        },
        {
            title: 'Settings',
            link: Path.settings,
            icon: 'assets/icons/menu/settings.png',
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
