import {Block} from '../../../code/base/block/Block';
import './chatItem.pcss';
import template from './chatItem.hbs';
import {IChatItemComponent} from '../../../code/types';

export class ChatItemComponent extends Block {
  constructor(props: IChatItemComponent) {
    super({...props});
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
