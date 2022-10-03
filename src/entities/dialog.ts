import { DateHelper } from 'utils/DateHelper';
import { TLastMessage } from './message';
import { User } from './user';

export type TDialog = {
    id: number;
    unread_count: number;
    last_message: TLastMessage;
    selected?: boolean;
};

export class Dialog {
    dialog;

    constructor(dialog: TDialog) {
        this.dialog = dialog;
    }

    get unreadCount() {
        return this.dialog.unread_count;
    }

    get avatar() {
        return this.dialog.last_message.user.avatar;
    }

    get name() {
        return new User(this.dialog.last_message.user).fullName;
    }

    get time() {
        return this.dialog.last_message.time;
    }

    get timeString() {
        return DateHelper.getMessageTime(new Date(this.dialog.last_message.time));
    }

    get text() {
        return this.dialog.last_message.content;
    }
}
