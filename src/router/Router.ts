import { Block } from 'core';
import Route from './Route';

export const defaultRootHTMLBlockId = '#app';

const defaultRedirectPage = '/';

export enum TAccess {
    'public',
    'protected',
}

class Router {
    public routes: Route[] = [];
    public history: History = window.history;
    private _currentRoute: Route | null | undefined = null;
    private _rootHTMLElementId: string = defaultRootHTMLBlockId;
    private _pathnames: string[] = [];
    private _publicPaths: string[] = [];
    private _protectedPaths: string[] = [];
    private _publicRedirect: string = defaultRedirectPage;
    private _protectedRedirect: string = defaultRedirectPage;
    private checkAuthCallback: () => any = () => {};
    static _instance: Router;

    constructor(rootHTMLElementId: string) {
        if (Router._instance) {
            return Router._instance;
        }

        this._rootHTMLElementId = rootHTMLElementId;

        Router._instance = this;
    }

    register(pathname: string, block: typeof Block, access: TAccess = TAccess.public) {
        const route = new Route(pathname, block, this._rootHTMLElementId);
        this.routes.push(route);
        this._pathnames.push(pathname);

        if (access === TAccess.public) {
            this._publicPaths.push(pathname);
        }

        if (access === TAccess.protected) {
            this._protectedPaths.push(pathname);
        }

        return this;
    }

    public setPublicRedirect(route: string) {
        this._publicRedirect = route;
        return this;
    }

    public setProtectedRedirect(route: string) {
        this._protectedRedirect = route;
        return this;
    }

    public compile() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string, force: boolean = false) {
        const pathTemplate = this._hasRoute(pathname);
        const route = this.getRoute(pathTemplate);

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        if (route) {
            this._currentRoute = route;
            route.render(force);
        }

        this.checkAuthCallback().then((result: boolean) => {
            if (result) {
                if (this._publicPaths.includes(pathTemplate)) {
                    this.go(this._publicRedirect);
                }
            } else {
                if (this._protectedPaths.includes(pathTemplate)) {
                    this.go(this._protectedRedirect);
                }
            }
        });
    }

    public onRoute(callback: () => Promise<boolean>) {
        this.checkAuthCallback = callback;
        return this;
    }

    private _hasRoute(pathname: string) {
        let route = '*';

        this._pathnames.forEach(path => {
            const pathParts = path.split('/');
            pathParts.shift();

            let replacedPath = path.replace(/:[A-Za-z0-9][^/]*/g, '[A-Za-z0-9-]*');

            replacedPath = replacedPath == '*' ? '' : replacedPath;

            const regexp = new RegExp(`^${replacedPath}$`, 'g');

            if (regexp.test(pathname)) {
                route = path;
            }
        });

        return route;
    }

    go(pathname: string | null, force: boolean = false) {
        if (pathname) {
            const pathnameClear = pathname.replace(window.origin, '');
            this.history.pushState({}, '', pathnameClear);
            this._onRoute(pathnameClear, force);
        }
    }

    getParams(): Record<string, string | null> {
        let path;

        if (this._currentRoute) {
            path = this._currentRoute.getPathname();
        } else {
            path = '';
        }
        const url = window.location.pathname;

        const pathParts = path.split('/');
        pathParts.shift();

        const pathParams: (string | boolean)[] = pathParts.map(part => {
            if (/:[A-Za-z0-9]/.test(part)) {
                return part.replace(':', '');
            } else {
                return false;
            }
        });

        const urlParts = url.split('/');
        urlParts.shift();
        const urlParams: Record<string, any> = {};
        urlParts.forEach((part, index) => {
            if (typeof pathParams[index] === 'string' && pathParams[index] !== false) {
                const key = pathParams[index].toString();
                urlParams[key] = part;
            }
        });
        return urlParams;
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }

    getCurrentRoute() {
        return this._currentRoute;
    }
}

export default Router;
