import { Block } from 'core';
import router from 'router';

export type Props = {
    link: string;
    title: string;
    active?: boolean;
    icon?: string;
};

export default class MenuItem extends Block<Props> {
    static componentName = 'MenuItem';

    constructor(props: Props) {
        const defaultProps: Props = {
            title: 'Link',
            link: '#',
            active: false,
        };

        super(Object.assign(defaultProps, props));

        this.setProps({
            events: {
                click: this.goTo.bind(this),
            },
        });
    }

    goTo() {
        router.go(this.props.link)
    }

    render() {
        return `
            <li class='links__item {{#if active}}active{{/if}}'>
                {{#if icon}}
                    <img src={{icon}} alt='{{title}}-icon' />
                {{/if}}
                <span>{{title}}</span>
            </li>
        `;
    }
}
