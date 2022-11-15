import Block from './Block/Block';

export default function renderDOM(
    component: Block<Record<string, unknown>>,
    elementId: string = 'app',
) {
    const rootElement = document.getElementById(elementId);
    if (rootElement) {
        rootElement.innerHTML = '';
        const content = component.getContent();
        if (content) {
            rootElement.appendChild(content);
        }
    }
}
