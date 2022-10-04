import { Block } from 'core';

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
    }

    render() {
        return `
            <a href={{link}}>
                <li class='links__item {{#if active}}active{{/if}}'>
                    {{#if icon}}
                        <img src={{icon}} alt='{{title}}-icon' />
                    {{/if}}
                    <span>{{title}}</span>
                </li>
            </a>
        `;
    }
}
