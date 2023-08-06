import {IErrorProps} from '../../code/types';
import {Block} from '../../code/base/block/Block';
import {Button} from '../button/buttonComponent';
import template from './error.hbs';

export class Error extends Block {
  constructor(props: IErrorProps) {
    super({...props});
  }

  protected init() {
    if (this.props.button) {
      this.children.button = new Button({...this.props.button});
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
