import { Auth, Reg, Chat, Settings, ErrorPage, Page404, ServerErrorPage } from 'pages';
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
import { router, Path } from 'router';
import { authController } from 'controllers/AuthController';

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
registerComponent(ErrorPage);

router
    .setPublicRedirect(Path.messenger)
    .setProtectedRedirect(Path.login)
    .onRoute(authController.checkAuth)
    .register(Path.home, Auth)
    .register(Path.login, Auth)
    .register(Path.registration, Reg)
    .register(Path.messenger, Chat, TAccess.protected)
    .register(Path.message, Chat, TAccess.protected)
    .register(Path.settings, Settings, TAccess.protected)
    .register(Path.serverError, ServerErrorPage, TAccess.protected)
    .register(Path.another, Page404, TAccess.protected)
    .compile();
