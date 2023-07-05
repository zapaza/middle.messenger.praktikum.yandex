import {Block} from './block/Block';

export default function renderDOM(block: Block) {
  document.title = 'Изменение пароля';
  const root = document.querySelector('#app');

  if (!root) {
    return;
  }

  root.append(block.getContent() as HTMLElement);
  block.dispatchComponentDidMount();
}
