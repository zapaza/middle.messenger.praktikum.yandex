import { Block } from "../../../../code/base/Block";
import {IMessageField} from "../../../../code/types";
import template from "./chatWindowMessageField.hbs";

export class ChatMessageFieldComponent extends Block {
    constructor(props: IMessageField) {
        super({...props});
    }

    render () {
        return this.compile(template, {...this.props});
    }

}
