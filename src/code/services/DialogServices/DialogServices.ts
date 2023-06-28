import {WebSocketBase} from '../../base/WebSocketBase';
import {IChatSocketPayload} from '../ChatsServices/types';
import {store} from '../../../store';

export class DialogServices extends WebSocketBase {
  constructor(userId: number, token: string, chatId: number) {
    super(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }

  public sendMessage(data:IChatSocketPayload) {
    if (this.ws) {
      this.ws.send(JSON.stringify(data));
    }
  }

  open(payload: IChatSocketPayload) {
    super.open(payload);

    if (this.ws) {
      this.ws.addEventListener('message', this.onMessage.bind(this));
    }
  }

  public close(): void {
    store.setState({
      chatMessages: [],
    });
    super.close();

    if (this.ws) {
      this.ws.removeEventListener('message', this.onMessage);
    }
  }

  private onMessage(event: MessageEvent): void {
    this.emitter.emit('chatMessages', JSON.parse(event.data));
  }
}
