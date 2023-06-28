import {EventBus} from './EventBus';
import {IChatSocketMessage, IChatSocketPayload} from '../services/ChatsServices/types';

export class WebSocketBase {
  public readonly endpoint: string;

  public emitter = new EventBus();

  public ws: WebSocket | null = null;

  private payload:IChatSocketPayload | undefined;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  public open(payload?: IChatSocketPayload): void {
    this.payload = payload;
    this.ws = new WebSocket(this.endpoint);

    this.ws.addEventListener('open', this.onOpen.bind(this));
    this.ws.addEventListener('close', this.onClose.bind(this));
  }

  public close(): void {
    if (!this.ws) {
      return;
    }

    this.ws.removeEventListener('open', this.onOpen);
    this.ws.removeEventListener('close', this.onClose);
    this.ws.close();
  }

  private onOpen(): void {
    (this.ws as WebSocket).send(JSON.stringify(this.payload));
  }

  private onClose = (event: CloseEvent): void => {
    this.emitter.emit('BaseEmitterClose', event);
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
      this.open(this.payload);
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  };

  public onMessageText(messageContent: IChatSocketMessage) {
    if (messageContent.type === 'error') {
      this.close();

      this.emitter.emit('BaseEmitterError', messageContent);
    }
  }
}
