import { Router } from 'router/Router';

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

export const router = new Router('#app');
