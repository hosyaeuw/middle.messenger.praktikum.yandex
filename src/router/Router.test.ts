import { expect } from 'chai';

import { Router } from './Router';
import Block from '../core/Block/Block';

describe('ROUTER TESTING:', () => {
    const router = new Router('#root');

    class IndexPage extends Block {
        render() {
            return `<div></div>`;
        }
    }

    class Login extends Block {
        render() {
            return `<div></div>`;
        }
    }

    class Messages extends Block {
        render() {
            return `<div></div>`;
        }
    }

    class Error404 extends Block {
        render() {
            return `<div></div>`;
        }
    }

    let callbackCounter = 0;

    const a = () => {
        callbackCounter += 1;
    };

    router
        // @ts-ignore
        .onRoute(a)
        // @ts-ignore
        .register('/', IndexPage)
        // @ts-ignore
        .register('/login', Login)
        // @ts-ignore
        .register('/messages/:id', Messages)
        // @ts-ignore
        .register('*', Error404)
        .compile();

    it('NAVIGATION', () => {
        router.go('/');
        router.go('/about');
        router.go('/messages/12');
        router.go('/efeverv');
        expect(router.history.length).to.eq(5);

        expect(callbackCounter).to.eq(5);
    });

    it('URL PARSER', () => {
        router.go('/messages/12');
        const { pathname } = router.getCurrentRoute() || {};
        expect(pathname).to.eq('/messages/:id');
    });
});
