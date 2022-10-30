import { router, Path } from 'router';
import { Block, registerComponent } from 'core';
import { DialogType, Dialog as DialogEntity } from 'entities/dialog';
import { Dialog, DialogListEmpty } from './components';
import { DialogTypeProps } from './components/Dialog';

import './styles.scss';
import { chatService } from 'services/chatService';
import { store } from 'store';

registerComponent(Dialog);
registerComponent(DialogListEmpty);

type Props = {};

type ComponentProps = Props & {
    dialogs: DialogTypeProps[];
};

const isOpenChat = (dialog: DialogType) => {
    const id = router.getParams().id;
    if (id) {
        return new DialogEntity(dialog).id === +id;
    }

    return false;
};

const onClickHandler = (dialog: DialogEntity) => {
    router.go(`${Path.messenger}/${dialog.id}`, true);
};

const generateValidDialog = (dialog: DialogType): DialogTypeProps => {
    const dialogEntity = new DialogEntity(dialog);

    return {
        src: dialogEntity.lastMessageUserAvatar,
        unreadCount: dialogEntity.unreadCount,
        name: dialogEntity.title,
        time: dialogEntity.timeString,
        text: dialogEntity.text,
        selected: isOpenChat(dialog),
        onClick: () => {
            onClickHandler(dialogEntity);
        },
    };
};

export default class DialogList extends Block<ComponentProps> {
    static componentName = 'DialogList';

    constructor(props: ComponentProps) {
        const { dialogs } = store.getState();
        const defaultProps: ComponentProps = {
            dialogs: dialogs.map(generateValidDialog),
        };

        super(Object.assign(defaultProps, props));
    }

    componentDidMount() {
        store.subscribe(state => {
            this.setProps({
                dialogs: state.dialogs.map(generateValidDialog),
            });
        }, 'Chat');

        const { fetchDialogs } = chatService();
        fetchDialogs();
    }

    render() {
        return `
            <div class='dialogs'>
                {{#if dialogs}}
                    {{#each dialogs}}
                        {{{Dialog
                            src=this.src
                            unreadCount=this.unreadCount
                            name=this.name
                            time=this.time
                            text=this.text
                            selected=this.selected
                            onClick=this.onClick
                        }}}
                    {{/each}}
                {{else}}
                    {{{DialogListEmpty}}}
                {{/if}}
            </div>
        `;
    }
}
