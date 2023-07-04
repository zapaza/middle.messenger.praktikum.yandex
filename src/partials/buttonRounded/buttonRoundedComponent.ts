import {Block} from '../../code/base/block/Block';
import {IButtonRoundedProps} from '../../code/types';
import template from './buttonRounded.hbs';
import './button.pcss';

export class ButtonRoundedComponent extends Block {
  constructor(props: IButtonRoundedProps) {
    super({...props});
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
