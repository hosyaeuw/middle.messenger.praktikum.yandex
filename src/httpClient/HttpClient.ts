import queryStringify from './queryStringify';

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Options = {
    method: Method;
    data?: Record<string, unknown>;
    timeout?: number;
    headers?: Record<string, string>;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
export default class HTTP {
    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        const { data } = options;
        return this._send(data ? `${url}&${queryStringify(data)}` : url, {
            ...options,
            method: Method.GET,
        });
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this._send(url, { ...options, method: Method.PUT });
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this._send(url, { ...options, method: Method.POST });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this._send(url, { ...options, method: Method.DELETE });
    }

    private _send(url: string, options: Options = { method: Method.GET }): Promise<XMLHttpRequest> {
        const { method, data, headers, timeout } = options;

        return new Promise((resolve, reject) => {
            let xhrTimeout: number | undefined;
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = function () {
                if (xhrTimeout) {
                    clearTimeout(xhrTimeout);
                }
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (timeout) {
                xhrTimeout = setTimeout(xhr.abort, timeout);
            }

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
