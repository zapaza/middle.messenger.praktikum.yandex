import { Block } from "../../../../code/base/Block";
import './chatWindowHeader.pcss';
import template from './chatWindowHeader.hbs';
import {IChatHeader} from "../../../../code/types";

export class ChatWindowHeaderComponent extends Block {
    constructor(props: IChatHeader) {
        super({...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
