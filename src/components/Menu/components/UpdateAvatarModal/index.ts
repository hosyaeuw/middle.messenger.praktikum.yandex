import { Block } from 'core';
import userService from 'services/userService';
import './styles.scss';

type Props = {
    onClose?: () => void;
};

type ComponentProps = Props & {
    formData?: FormData;
    uploadFileHandler?: () => void;
};

const getFileName = (formData?: FormData) => {
    if (formData) {
        const file = formData.get('avatar') as File;
        return file.name;
    }

    return 'filename error';
};

export default class UpdateAvatarModal extends Block<ComponentProps> {
    static componentName = 'UpdateAvatarModal';

    constructor(props: Props) {
        super(props);

        this.setProps({
            uploadFileHandler: this.uploadFileHandler.bind(this),
            updateAvatarHandler: this.updateAvatarHandler.bind(this),
        });
    }

    updateAvatarHandler() {
        if (this.props.formData) {
            const { uploadAvatar } = userService();

            uploadAvatar(this.props.formData).then(() => {
                this.setProps({
                    formData: null,
                });
            });
        }
    }

    uploadFileHandler() {
        const uploadAvatar = (e: Event) => {
            const formData = new FormData();
            const { files } = e.target as HTMLInputElement;
            if (!files?.length) {
                return;
            }
            const [file] = files;
            formData.append('avatar', file);

            this.setProps({
                formData,
            });
        };

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = uploadAvatar;
        fileInput.click();
    }

    render() {
        return `
            <div class='modal-container'>
                <div class='modal'>
                    <div class="modal-close-btn">
                        {{{Button color="ghost" content="&times;" onClick=onClose}}}
                    </div>
                    <div class='modal-content'>
                        <h3>Upload File</h3>
                        <div class="text_blue">
                            {{#if formData}}
                                ${getFileName(this.props.formData)}
                            {{else}}
                                {{{Button format="link" content="Select file on computer" onClick=uploadFileHandler}}}
                            {{/if}}
                        </div>

                        {{{Button content="Change avatar" disabled=${!this.props
                            .formData} onClick=updateAvatarHandler}}}
                    </div>
                </div>
            </div>
        `;
    }
}
