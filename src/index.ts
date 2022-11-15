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

import './globalStyles/global.scss'
import './globalStyles/normalize.scss'

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
    // @ts-ignore
    .register(Path.home, Auth)
    // @ts-ignore
    .register(Path.login, Auth)
    // @ts-ignore
    .register(Path.registration, Reg)
    // @ts-ignore
    .register(Path.messenger, Chat, TAccess.protected)
    // @ts-ignore
    .register(Path.message, Chat, TAccess.protected)
    // @ts-ignore
    .register(Path.settings, Settings, TAccess.protected)
    // @ts-ignore
    .register(Path.serverError, ServerErrorPage, TAccess.protected)
    // @ts-ignore
    .register(Path.another, Page404, TAccess.protected)
    .compile();
