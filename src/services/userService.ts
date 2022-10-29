import AuthController, { LoginData, RegData } from 'controllers/AuthController';
import UserController, {
    ChangePasswordData,
    ChangeProfileData,
    SearchUserData,
} from 'controllers/UserController';

import router, { Path } from 'router';
import store from 'store';

const userService = () => {
    const { profile } = store.getState();

    const searchUserByLogin = (data: SearchUserData) => {
        return UserController.searchUserByLogin(data).then(response => {
            return response.response;
        });
    };

    const login = (data: LoginData) => {
        AuthController.signIn(data).then(() => {
            router.go(Path.messenger);
        });
    };

    const registration = (data: RegData) => {
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

    const changePassword = (data: ChangePasswordData) => {
        return UserController.changePassword(data);
    };

    const changeProfile = (data: ChangeProfileData) => {
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
