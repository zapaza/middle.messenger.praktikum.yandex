import { Block } from "./Block";

export default function renderDOM(block: Block) {
    document.title = 'Изменение пароля';
    const root = document.querySelector('#root');

    if (!root) {
        return;
    }

    root.append(block.getContent() as HTMLElement);
    block.dispatchComponentDidMount();
}
