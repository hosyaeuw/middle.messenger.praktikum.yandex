import { authController, LoginData, RegData } from 'controllers/AuthController';
import {
    ChangePasswordData,
    ChangeProfileData,
    SearchUserData,
    userController,
} from 'controllers/UserController';
import { Path, router } from 'router';

import { store } from 'store';

export const userService = () => {
    const { profile } = store.getState();

    const searchUserByLogin = (data: SearchUserData) => {
        return userController.searchUserByLogin(data).then(response => {
            return response.response;
        });
    };

    const login = (data: LoginData) => {
        authController.signIn(data).then(() => {
            router.go(Path.messenger);
        });
    };

    const registration = (data: RegData) => {
        authController.signUp(data).then(() => {
            router.go(Path.login);
        });
    };

    const logout = () => {
        authController.signOut().then(() => {
            router.go(Path.login);
        });
    };

    const uploadAvatar = (data: FormData) => {
        return userController.uploadAvatar(data);
    };

    const changePassword = (data: ChangePasswordData) => {
        return userController.changePassword(data);
    };

    const changeProfile = (data: ChangeProfileData) => {
        return userController.changeProfile(data);
    };

    return {
        profile,
        registration,
        login,
        logout,
        uploadAvatar,
        searchUserByLogin,
        changePassword,
        changeProfile,
    };
};

export default userService;
