import { Block } from 'core';
import './styles.scss';

type Props = {
    formTitle: string;
    onSubmit: (e: SubmitEvent) => void;
    events?: {
        submit?: (e: SubmitEvent) => void;
    };
};

export default class FormLayout extends Block<Props> {
    constructor(props: Props) {
        if (props.onSubmit) {
            if (!props.events) {
                props.events = {};
            }

            props.events.submit = props.onSubmit;
        }

        super(props);
    }

    render() {
        return `
            <div class='root-form-container'>
                <div class='form-container'>
                    <h2 class='form-title'>{{formTitle}}</h2>
                    <form class='form' data-layout=1>
                    </form>
                </div>
            </div>
        `;
    }
}
