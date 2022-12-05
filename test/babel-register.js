const { JSDOM } = require('jsdom');

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.js'] });

const dom = new JSDOM('<div id="root"><div>', { url: 'http://localhost:3000/' });
global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = window.DocumentFragment;
global.Node = dom.window.Node;
global.FormData = dom.window.FormData;
