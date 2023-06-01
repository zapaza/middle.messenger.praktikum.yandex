import "./chatMessage.pcss";
import template from "./chatMessage.hbs";
import { Block } from "../../../../code/base/Block";
import { IChatMessage } from "../../../../code/types";

export class ChatMessageComponent extends Block {
    constructor(props: IChatMessage) {
        super({...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
