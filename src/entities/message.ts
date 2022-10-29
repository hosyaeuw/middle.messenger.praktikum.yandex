import { DateHelper } from 'utils/DateHelper';
import { IUser } from './user';

import openChat from 'data/openChat';
import profile from 'data/profile';
import store from 'store';

export type LastMessage = {
    user?: IUser;
    time: string;
    content: string;
};

export type MessageType = {
    content: string;
    time: string;
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
};

export class Message {
    message;

    constructor(message: MessageType) {
        this.message = message;
    }

    get avatar() {
        return !this.isMe ? openChat.opponent[0].avatar : profile.avatar;
    }

    get text() {
        return this.message.content;
    }

    get time() {
        return this.message;
    }

    get timeString() {
        return DateHelper.getMessageTime(new Date(this.message.time), ['hour', 'minute']);
    }

    get isMe() {
        return store.getState().profile.id === this.message.user_id;
    }
}
