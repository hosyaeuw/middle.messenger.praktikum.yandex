import Router from 'router/Router';

export enum Path {
    home = '/',
    login = '/login',
    registration = '/sign-up',
    messenger = '/messenger',
    message = '/messenger/:id',
    settings = '/settings',
    serverError = '/500',
    another = '/404',
}

const router = new Router('#app');

export default router;
