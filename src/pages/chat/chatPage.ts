import './chat.pcss';
import template from './chat.hbs';
import { Block } from "../../code/base/Block";
import { IChatItem, IChatMessage, IChatPage} from "../../code/types";
import { ChatSearchComponent } from "../../partials/chat/chatSearch/chatSearchComponent";
import { ChatItemComponent } from "../../partials/chat/chatItem/chatItemComponent";
import { ChatWindowHeaderComponent } from "../../partials/chat/chatWindow/header/chatWindowHeaderComponent";
import { ChatBottomComponent } from "../../partials/chat/chatWindow/message/chatMessageComponent";
import { ChatMessageComponent } from "../../partials/chat/chatWindow/chatMessage/chatMessageComponent";
import { Error } from "../../partials/error/errorComponent";

export class ChatPage extends Block {

    constructor(props: IChatPage) {
        super({...props});
    }

    init() {
        this.children.chatSearch = new ChatSearchComponent({...this.props.chatSearch});
        this.children.chatsList =  this.props.chatsList.map((el: IChatItem) => new ChatItemComponent( {...el}));
        this.children.chatHeader = new ChatWindowHeaderComponent({...this.props.chatHeader}) ;
        this.children.messages = this.props.messages.map((el:IChatMessage) => new ChatMessageComponent({...el}));
        this.children.error = new Error({...this.props.error});
        this.children.chatBottom = new ChatBottomComponent({...this.props.chatBottom});
    }


    render() {
        return this.compile(template, {...this.props});
    }
}
