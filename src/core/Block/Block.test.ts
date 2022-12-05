import Block from './Block';
import { assert, expect } from 'chai';

type Props = { text: string };

const componentClasses = {
    parent: 'component-container',
    children: 'component__children',
};

const props = { text: 'Test text' };

class TestComponent extends Block<Props> {
    static componentName: 'TestComponent';

    render() {
        return `
            <div class="${componentClasses.parent}">
                <div class="${componentClasses.children}">
                    {{text}}
                </div>
            </div>
    `;
    }
}

const generateComponent = () => new TestComponent(props);

describe('Block', () => {
    it('Correct render component', () => {
        assert.isNotNull(generateComponent().element);
    });

    it('Get children element by class', () => {
        const componentChildElement = generateComponent().element?.querySelector(
            `.${componentClasses.children}`,
        );
        assert.isNotNull(componentChildElement);
    });

    it('Correct generate props', () => {
        const componentChildElement = generateComponent().element?.querySelector(
            `.${componentClasses.children}`,
        );
        expect(componentChildElement?.textContent?.trim()).to.eq(props.text);
    });
});
