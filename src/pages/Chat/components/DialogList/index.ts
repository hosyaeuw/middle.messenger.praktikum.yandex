import { Block, registerComponent } from 'core';
import { TDialog, Dialog as DialogEntity } from 'entities/dialog';
import { Dialog } from './components';
import { TDialogProps } from './components/Dialog';

import './styles.scss';

import openChat from 'data/openChat';

registerComponent(Dialog);

type Props = {
    dialogs: TDialog[];
    validDialogs?: TDialogProps[];
};

const isOpenChat = (dialog: TDialog) =>
    dialog.last_message.user.first_name === openChat.opponent.first_name;

const generateValidDialog = (dialog: TDialog): TDialogProps => {
    const dialogEntity = new DialogEntity(dialog);

    return {
        src: dialogEntity.avatar,
        unreadCount: dialogEntity.unreadCount,
        name: dialogEntity.name,
        time: dialogEntity.timeString,
        text: dialogEntity.text,
        selected: isOpenChat(dialog),
    };
};

export default class DialogList extends Block<Props> {
    constructor(props: Props) {
        const defaultProps: Props = {
            dialogs: [],
        };

        props.validDialogs = (props.dialogs || []).map(generateValidDialog);
        super(Object.assign(defaultProps, props));
    }

    render() {
        return `
            <div class='dialogs'>
                {{#each validDialogs}}
                    {{{Dialog
                        src=this.src
                        unreadCount=this.unreadCount
                        name=this.name
                        time=this.time
                        text=this.text
                        selected=this.selected
                    }}}
                {{/each}}
            </div>
        `;
    }
}
