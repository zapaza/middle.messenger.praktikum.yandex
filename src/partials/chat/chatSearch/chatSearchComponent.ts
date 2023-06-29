import {Block} from '../../../code/base/Block';
import template from './chatSearch.hbs';
import './chatSearch.pcss';
import {InputComponent} from '../../input/inputComponent';
import {IInputProps} from '../../../code/types';
import {Button} from '../../button/buttonComponent';
import {router} from '../../../utils/useRouter';

export class ChatSearchComponent extends Block {
  constructor(props: IInputProps) {
    super({...props});
  }

  componentDidMount() {
    this.children.searchInput = new InputComponent({
      type: 'text',
      placeholder: 'Поиск',
      name: 'search',
      events: {
        input: (event) => console.log(event),
      },

    });

    this.children.buttonSettings = new Button({
      text: 'Настройки',
      isSecondary: true,
      events: {
        click: () => router.go('/account'),
      }
    });
  }

  protected render() {
    return this.compile(template, {...this.props});
  }
}
