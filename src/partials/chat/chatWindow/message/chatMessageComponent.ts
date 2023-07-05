import {Block} from '../../../../code/base/block/Block';
import {IChatWindowMessage} from '../../../../code/types';
import template from './chatWindowMessage.hbs';
import './chatWindowMessage.pcss';
import {ButtonRoundedComponent} from '../../../buttonRounded/buttonRoundedComponent';
import {ChatMessageFieldComponent} from './chatMessageFieldComponent';

export class ChatBottomComponent extends Block {
  constructor(props: IChatWindowMessage) {
    super({...props});
  }

  componentDidMount() {
    this.children.buttonSend = new ButtonRoundedComponent({...this.props.buttonSend});
    this.children.messageField = new ChatMessageFieldComponent({...this.props.messageField});
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
