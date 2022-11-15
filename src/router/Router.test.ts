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

    const inc = () => {
        callbackCounter += 1;
    };

    router
        .onRoute(inc)
        .register('/', IndexPage as typeof Block)
        .register('/login', Login as typeof Block)
        .register('/messages/:id', Messages as typeof Block)
        .register('*', Error404 as typeof Block)
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
