import { router, Path } from 'router';
import { Block, registerComponent } from 'core';
import { DialogType, Dialog as DialogEntity } from 'entities/dialog';
import { Dialog, DialogListEmpty } from './components';
import { DialogTypeProps } from './components/Dialog';

import './styles.scss';

registerComponent(Dialog);
registerComponent(DialogListEmpty);

type Props = {
    dialogs: DialogType[];
    validDialogs?: DialogTypeProps[];
    onClick?: (dialog: DialogType) => void;
};

const isOpenChat = (dialog: DialogType) => {
    const id = router.getParams().id;
    if (id) {
        return new DialogEntity(dialog).id === +id;
    }

    return false;
};

const onClickHandler = (dialog: DialogEntity) => {
    router.go(`${Path.messenger}/${dialog.id}`);
};

export default class DialogList extends Block<Props> {
    static componentName = 'DialogList';

    constructor(props: Props) {
        const defaultProps: Props = {
            dialogs: [],
        };

        super(Object.assign(defaultProps, props));

        this.setProps({
            validDialogs: (props.dialogs || []).map(this.generateValidDialog.bind(this)),
        });
    }

    generateValidDialog(dialog: DialogType): DialogTypeProps {
        const dialogEntity = new DialogEntity(dialog);

        return {
            src: dialogEntity.avatar,
            unreadCount: dialogEntity.unreadCount,
            name: dialogEntity.title,
            time: dialogEntity.timeString,
            text: dialogEntity.text,
            selected: isOpenChat(dialog),
            onClick: () => {
                this.props.onClick && this.props.onClick(dialog);
                onClickHandler(dialogEntity);
            },
        };
    }

    render() {
        return `
            <div class='dialogs'>
                {{#if dialogs}}
                    {{#each validDialogs}}
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
