import Store from 'core/Store';
import { chatInitialState } from './chatStore';
import { profileInitialState } from './profileStore';

export const store = new Store({
    ...chatInitialState,
    ...profileInitialState,
});
// @ts-ignore
window.store = store;
