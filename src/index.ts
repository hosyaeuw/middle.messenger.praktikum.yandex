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
import { Block, registerComponent } from 'core';
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
    .register(Path.home, Auth as typeof Block)
    .register(Path.login, Auth  as typeof Block)
    .register(Path.registration, Reg  as typeof Block)
    .register(Path.messenger, Chat  as typeof Block, TAccess.protected)
    .register(Path.message, Chat  as typeof Block, TAccess.protected)
    .register(Path.settings, Settings  as typeof Block, TAccess.protected)
    .register(Path.serverError, ServerErrorPage  as typeof Block, TAccess.protected)
    .register(Path.another, Page404  as typeof Block, TAccess.protected)
    .compile();
