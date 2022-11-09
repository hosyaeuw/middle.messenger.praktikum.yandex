import { IProfile } from 'entities/user';
import { api } from 'httpClient/api';
import { httpClient } from '../httpClient';

export type SearchUserData = {
    login: string;
};

export type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};

export type ChangeProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

class UserController {
    public async getProfile() {
        return httpClient.get<IProfile>(`${api.auth.domain}${api.auth.getProfile}`);
    }

    public async uploadAvatar(data: FormData) {
        return httpClient.put(`${api.user.domain}${api.user.avatar}`, {
            data,
        });
    }

    public async searchUserByLogin(data: SearchUserData) {
        return httpClient.post<IProfile[]>(`${api.user.domain}${api.user.search}`, {
            data,
        });
    }

    public async changePassword(data: ChangePasswordData) {
        return httpClient.put(`${api.user.domain}${api.user.password}`, {
            data,
        });
    }

    public async changeProfile(data: ChangeProfileData) {
        return httpClient.put(`${api.user.domain}${api.user.profile}`, {
            data,
        });
    }
}

export const userController = new UserController();
