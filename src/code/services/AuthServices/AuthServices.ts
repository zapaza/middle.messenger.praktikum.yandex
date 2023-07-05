import {HTTPBaseRequest} from "../../base/httpBaseRequest/HTTPBaseRequest";
import {Endpoints} from "../../endpoints";
import {router} from "../../../utils/useRouter";
import {store} from "../../../store";
import {removeLocalStorageItem, setLocalStorageItem} from "../../../utils/localStorage";
import {ISingInBody, ISingUpBody, ISingUpResponse, IUserResponse} from "./types";

const request = new HTTPBaseRequest();
export class AuthServices {
  public signIn(body: ISingInBody) {
    return request.post<ISingUpResponse>(`${process.env.API_URL}${Endpoints.SING_IN}`, {
      data: JSON.stringify(body),
    }).then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!response.reason) {
        router.go('/messages');
      } else {
        console.log('response:', response);
      }

    }).catch((err: Error) => console.log('error:', err));
  }

  public singUp(body: ISingUpBody) {
    return request.post(`${process.env.API_URL}${Endpoints.SING_UP}`, {
      data: JSON.stringify(body),
    }).then(() => {
      router.go('/messages');
    }).catch((error: Error) => console.error(error));
  }

  public logout() {
    return request.post(`${process.env.API_URL}${Endpoints.LOGOUT}`).then(() => {
      router.go('/login');
    }).catch((error: Error) => console.error(error));
  }

  public  authCheck() {
    return request.get<IUserResponse>(`${process.env.API_URL}${Endpoints.USER}`)
      .then((response) => {
        store.setState({
          currentUser: response,
        });
        setLocalStorageItem('userId', (response as IUserResponse).id);
        return true;
      }).catch(() => {
        removeLocalStorageItem('userId');
        return false;
      });
  }
}
