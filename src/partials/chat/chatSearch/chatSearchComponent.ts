import {Block} from '../../../code/base/Block';
import template from './chatSearch.hbs';
import './chatSearch.pcss';
import {InputComponent} from '../../input/inputComponent';
import {IInputProps} from '../../../code/types';

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
  }

  protected render() {
    return this.compile(template, {...this.props});
  }
}
