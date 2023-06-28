import {HTTPBaseRequest} from '../../base/HTTPBaseRequest';
import {Endpoints} from '../../endpoints';
import {store} from '../../../store';
import {IChatItem, IChatTokenBody, IChatTokenResponse, IChatUserPayload, IGetChatParams, INewChatBody, INewChatResponse} from './types';
import {METHOD} from '../../types';
import {router} from '../../../utils/useRouter';

export class ChatsServices extends HTTPBaseRequest {
  apiUrl: string;

  constructor() {
    super();
    this.apiUrl = process.env.API_URL as string;
  }

  public getChats(params?: IGetChatParams) {
    return this.get<IChatItem[]>(`${this.apiUrl}${Endpoints.CHATS}`, {
      data: params,
      method: METHOD.GET,
    })
      .then((response) => {
        store.setState({
          chatList: response,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  public createNewChat(params: INewChatBody) {
    return this.post<INewChatResponse>(`${this.apiUrl}${Endpoints.CHATS}`, {
      data: JSON.stringify(params),
    }).then((response) => {
      if (response.id) {
        router.go(`/messages/${response.id}`, true);
        return response;
      }
    })
      .catch((e:Error) => {
        console.log(e);
      });
  }

  public getChatToken(params: IChatTokenBody) {
    return this.post<IChatTokenResponse>(`${this.apiUrl}${Endpoints.CHATS_TOKEN(params.id)}`).then((response) => {
      return response.token;
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  public addUserForChat(params: IChatUserPayload) {
    return this.put(`${this.apiUrl}${Endpoints.CHAT_USERS}`, {
      data: JSON.stringify(params),
    });
  }

  public removeUserForChat(params: IChatUserPayload) {
    return this.delete(`${this.apiUrl}${Endpoints.CHAT_USERS}`, {
      data: JSON.stringify(params)
    });
  }
}
