import { Block } from 'core';

import { defaultRootHTMLBlockId } from './Router';

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    if (root) {
        root.append(block.getContent()!);
        return root;
    }
    return false;
}

export class Route {
    public pathname: string;

    private _blockClass: typeof Block;

    private _block: Block | null;
    private _rootHTMLBlockId: string;

    constructor(pathname: string, view: typeof Block, rootHTMLBlockId = defaultRootHTMLBlockId) {
        this.pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._rootHTMLBlockId = rootHTMLBlockId;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.destroy();
        }
    }

    match(pathname: string) {
        return pathname === this.pathname;
    }

    render(force: boolean = false) {
        this._block = new this._blockClass();
        render(this._rootHTMLBlockId, this._block);
        this._block.show(force);
    }

    getPathname() {
        return this.pathname;
    }
}
