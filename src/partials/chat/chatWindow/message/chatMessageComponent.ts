import { Block } from "../../../../code/base/Block";
import { IChatWindowMessage } from "../../../../code/types";
import template from './chatWindowMessage.hbs';
import "./chatWindowMessage.pcss";
import {ButtonRoundedComponent} from "../../../buttonRounded/buttonRoundedComponent";
import {ChatMessageFieldComponent} from "./chatMessageFieldComponent";

export class ChatBottomComponent extends Block {
    constructor(props: IChatWindowMessage) {
        super({...props});
    }

    init() {
        this.children.buttonAtach = new ButtonRoundedComponent({...this.props.buttonAtach}) ;
        this.children.buttonSend = new ButtonRoundedComponent({...this.props.buttonSend}) ;
        this.children.messageField = new ChatMessageFieldComponent({...this.props.messageField});

        this.children.buttonSend.setProps({
            events: {
                click: () => {
                    console.log('сообщение отправлено');
                },
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
