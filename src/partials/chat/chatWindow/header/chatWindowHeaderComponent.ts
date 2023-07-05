import {Block} from '../../../../code/base/block/Block';
import './chatWindowHeader.pcss';
import template from './chatWindowHeader.hbs';
import {IChatHeader} from '../../../../code/types';
import {ButtonRoundedComponent} from '../../../buttonRounded/buttonRoundedComponent';
import {Button} from '../../../button/buttonComponent';

export class ChatWindowHeaderComponent extends Block {
  constructor(props: IChatHeader) {
    super({...props});
  }

  componentDidMount() {
    this.children.buttonAddUser = new ButtonRoundedComponent({...this.props.buttonAddUser});
    this.children.buttonRemoveUser = new ButtonRoundedComponent({...this.props.buttonRemoveUser});
    this.children.buttonRemoveChat = new Button({...this.props.buttonRemoveChat});
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
