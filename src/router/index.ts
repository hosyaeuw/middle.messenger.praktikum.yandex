import { Auth, Reg, Chat, Settings, ErrorPage } from 'pages';

export enum Path {
    home = '/',
    auth = '/auth',
    reg = '/reg',
    chat = '/chat',
    settings = '/settings',
    serverError = '/500',
    another = '/404',
}

export const routers = {
    [Path.home]: () => window.location.replace(Path.auth),
    [Path.auth]: () => new Auth(),
    [Path.reg]: () => new Reg(),
    [Path.chat]: () => new Chat(),
    [Path.settings]: () => new Settings(),
    [Path.serverError]: () =>
        new ErrorPage({
            title: '500',
            description: 'We already know about the problem and are trying to solve it',
        }),
    [Path.another]: () =>
        new ErrorPage({
            title: '404',
            description: 'this page does not exist',
        }),
};
