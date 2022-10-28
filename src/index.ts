import { Auth, Reg, Chat, Settings, ErrorPage } from 'pages';
import { TAccess } from 'router/Router';
import {
    Button,
    Input,
    InputField,
    Avatar,
    FormFields,
    Error,
    Menu,
    Modal,
    AddUsersToChatModal,
    DeleteUsersFromChatModal,
} from 'components';
import { MainLayout, FormLayout } from 'layouts';
import { registerComponent } from 'core';
import AuthController from 'controllers/AuthController';
import router, { Path } from 'router';

registerComponent(MainLayout);
registerComponent(Button);
registerComponent(Input);
registerComponent(InputField);
registerComponent(FormLayout);
registerComponent(FormFields);
registerComponent(Error);
registerComponent(Avatar);
registerComponent(Menu);
registerComponent(Modal);
registerComponent(AddUsersToChatModal);
registerComponent(DeleteUsersFromChatModal);

// export const routers = {
//     [Path.home]: () => window.location.replace(Path.auth),
//     [Path.auth]: () => new Auth(),
//     [Path.reg]: () => new Reg(),
//     [Path.chat]: () => new Chat(),
//     [Path.settings]: () => new Settings(),
//     [Path.serverError]: () =>
//         new ErrorPage({
//             title: '500',
//             description: 'We already know about the problem and are trying to solve it',
//         }),
//     [Path.another]: () =>
//         new ErrorPage({
//             title: '404',
//             description: 'this page does not exist',
//         }),
// };

router
    .setPublicRedirect(Path.messenger)
    .setProtectedRedirect(Path.login)
    .onRoute(AuthController.checkAuth)
    .register(Path.home, Auth)
    .register(Path.login, Auth)
    .register(Path.registration, Reg)
    .register(Path.messenger, Chat, TAccess.protected)
    .register(Path.message, Chat, TAccess.protected)
    .register(Path.settings, Settings, TAccess.protected)
    .register(Path.serverError, ErrorPage, TAccess.protected)
    .register(Path.another, ErrorPage, TAccess.protected)
    .compile();
