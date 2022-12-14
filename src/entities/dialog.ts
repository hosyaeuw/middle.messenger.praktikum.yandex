import { BASE_MEDIA_URL } from 'httpClient/api';
import { DateHelper } from 'utils/DateHelper';
import { LastMessage } from './message';

export type DialogType = {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
    unread_count: number;
    last_message: LastMessage;
};

const emptyAvatarSrc = 'https://www.mzpo-s.ru/images/teachers/prepodavatel.png';

export class Dialog {
    dialog;

    constructor(dialog: DialogType) {
        this.dialog = dialog;
    }

    get id() {
        return this.dialog.id;
    }

    get title() {
        return this.dialog.title;
    }

    get unreadCount() {
        return this.dialog.unread_count;
    }

    get avatar() {
        if (this.dialog.avatar) {
            return `${BASE_MEDIA_URL}${this.dialog.avatar}`;
        }

        return emptyAvatarSrc;
    }

    get lastMessageUserAvatar() {
        if (this.dialog.last_message?.user?.avatar) {
            return `${BASE_MEDIA_URL}${this.dialog.last_message.user.avatar}`;
        }

        return emptyAvatarSrc;
    }

    get timeString() {
        if (this.dialog.last_message) {
            return DateHelper.getMessageTime(new Date(this.dialog.last_message.time));
        }

        return '';
    }

    get text() {
        return this.dialog.last_message?.content || 'empty dialog';
    }
}
