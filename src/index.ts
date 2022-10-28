import { Button, Input, InputField, Avatar, FormFields, Error, Menu } from 'components';
import { MainLayout, FormLayout } from 'layouts';
import { routers, Path } from 'router';
import { registerComponent, renderDOM } from './core';

registerComponent(MainLayout);
registerComponent(Button);
registerComponent(Input);
registerComponent(InputField);
registerComponent(FormLayout);
registerComponent(FormFields);
registerComponent(Error);
registerComponent(Avatar);
registerComponent(Menu);

document.addEventListener('DOMContentLoaded', () => {
    const path: string = document.location.pathname;
    // @ts-ignore
    const page = routers[path] ?? routers[Path.another];
    renderDOM(page());
});
