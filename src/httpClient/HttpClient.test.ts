import sinon, { SinonFakeXMLHttpRequest } from 'sinon';
import { expect } from 'chai';
import HTTP from './HttpClient';

describe('HttpClient', () => {
    const xhr = sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    const client = new HTTP('/');
    const requests: SinonFakeXMLHttpRequest[] = [];
    const url = '/';

    beforeEach(() => {
        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };
    });

    afterEach(() => {
        requests.length = 0;
    });

    it('check url', () => {
        client.get(url).then(() => {
            const request = requests[0];

            expect(request?.url).to.eq(url);
        });
    });

    describe('check GET', () => {
        it('check method', () => {
            client.get(url).then(() => {
                const request = requests[0];

                expect(request?.method).to.eq('Get');
            });
        });
    });

    describe('check POST', () => {
        it('check body', () => {
            const data = {
                fizz: 'bar',
            };
            client.post(url, { data }).then(() => {
                const request = requests[0];

                expect(request?.requestBody).to.eq(data);
            });
        });
        it('check method', () => {
            client.post(url, {}).then(() => {
                const request = requests[0];

                expect(request?.method).to.eq('Post');
            });
        });
    });

    describe('check PUT', () => {
        it('check body', () => {
            const data = {
                fizz: 'bar',
            };
            client.put(url, { data }).then(() => {
                const request = requests[0];

                expect(request?.requestBody).to.eq(data);
            });
        });
        it('check method', () => {
            client.put(url, {}).then(() => {
                const request = requests[0];

                expect(request?.method).to.eq('Put');
            });
        });
    });

    describe('check DELETE', () => {
        it('check method', () => {
            client.delete(url, {}).then(() => {
                const request = requests[0];

                expect(request?.method).to.eq('Delete');
            });
        });
    });
});
