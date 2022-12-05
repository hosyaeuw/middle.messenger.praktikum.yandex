import { expect } from 'chai';
import { Router } from './Router';
import Block from '../core/Block';

describe('ROUTER TESTING:', () => {
    const router = new Router('#root');
    class IndexPage extends Block {
    }
    class Login extends Block {
    }
    class Messages extends Block {
    }
    class Error404 extends Block {
    }
    let callbackCounter = 0;
    router
        .onRoute(() => {
        callbackCounter += 1;
    })
        .register('/', IndexPage)
        .register('/login', Login)
        .register('/messages/:id', Messages)
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
//# sourceMappingURL=Router.test.js.map