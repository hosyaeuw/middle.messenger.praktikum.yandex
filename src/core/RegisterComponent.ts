import Handlebars, { HelperOptions } from 'handlebars';

import Block from './Block';

export interface ComponentConstructable<Props extends Record<string, unknown>> {
    new (props: Props): Block<Props>;
    componentName?: string;
}

export default function registerComponent<Props extends Record<string, unknown>>(
    Block: ComponentConstructable<Props>,
) {
    Handlebars.registerHelper(
        Block.componentName || Block.name,
        function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
            if (!data.root.children) {
                data.root.children = {};
            }

            if (!data.root.refs) {
                data.root.refs = {};
            }

            const { children, refs } = data.root;

            Object.keys(hash).forEach((key: keyof Props) => {
                if (this[key] && typeof this[key] === 'string') {
                    hash[key] = hash[key].replace(
                        new RegExp(`{{${key as string}}}`, 'i'),
                        this[key],
                    );
                }
            });

            const component = new Block(hash);

            children[component.id] = component;

            if (ref) {
                refs[ref] = component;
            }

            const contents = fn ? fn(this) : '';

            return `<div data-id="${component.id}">${contents}</div>`;
        },
    );
}
