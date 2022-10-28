import api from 'httpClient/api';
import store from 'store';
import httpClient from '../httpClient';

export type TLoginData = {
    login: 'string';
    password: 'string';
};

export type TRegData = {
    first_name: 'string';
    second_name: 'string';
    login: 'string';
    email: 'string';
    password: 'string';
    phone: 'string';
};

class AuthController {
    public async signIn(data: TLoginData) {
        return httpClient.post(`${api.auth.domain}${api.auth.auth}`, {
            data,
        });
    }

    public async signUp(data: TRegData) {
        return httpClient.post(`${api.auth.domain}${api.auth.reg}`, {
            data,
        });
    }

    public async signOut() {
        return httpClient.post(`${api.auth.domain}${api.auth.logout}`);
    }

    public async checkAuth() {
        return httpClient.get(`${api.auth.domain}${api.auth.getProfile}`).then(response => {
            if (response.status === 401) {
                return false;
            } else {
                store.setState({
                    profile: response.response,
                });
                return true;
            }
        });
    }
}

export default new AuthController();
