import { Block, registerComponent } from 'core';
import { TDialog } from 'entities/dialog';
import { MessageList, NewMessageForm, NewChatButton } from '../';

import './styles.scss';

registerComponent(MessageList);
registerComponent(NewMessageForm);
registerComponent(NewChatButton);

type Props = {
    openDialog: TDialog;
};

type ComponentProps = Props & {};

export default class OpenDialog extends Block<ComponentProps> {
    static componentName = 'OpenDialog';

    constructor(props: Props) {
        super(props);
        this.setProps({
            title: (function () {
                if (!props.openDialog) {
                    return '123';
                } else {
                    return props.openDialog.title;
                }
            })(),
        });
    }

    render() {
        return `
            <div class='chat-dialog'>
                <div class='header'>
                    
                    <div>
                        <span class='name'>{{title}}</span>
                    </div>
                </div>

            </div> 
        `;
    }
}
