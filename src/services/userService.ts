import AuthController, { TLoginData, TRegData } from 'controllers/AuthController';
import UserController, {
    TChangePasswordData,
    TChangeProfileData,
    TSearchUserData,
} from 'controllers/UserController';

import router, { Path } from 'router';
import store from 'store';

const userService = () => {
    const { profile } = store.getState();

    const searchUserByLogin = (data: TSearchUserData) => {
        return UserController.searchUserByLogin(data).then(response => {
            return response.response;
        });
    };

    const login = (data: TLoginData) => {
        AuthController.signIn(data).then(() => {
            router.go(Path.messenger);
        });
    };

    const registration = (data: TRegData) => {
        AuthController.signUp(data).then(() => {
            router.go(Path.login);
        });
    };

    const logout = () => {
        AuthController.signOut().then(() => {
            router.go(Path.login);
        });
    };

    const uploadAvatar = (data: FormData) => {
        return UserController.uploadAvatar(data);
    };

    const changePassword = (data: TChangePasswordData) => {
        return UserController.changePassword(data);
    };

    const changeProfile = (data: TChangeProfileData) => {
        return UserController.changeProfile(data);
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
