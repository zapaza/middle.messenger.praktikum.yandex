import {HTTPBaseRequest} from '../../base/HTTPBaseRequest';
import {Endpoints} from '../../endpoints';
import {router} from '../../../utils/useRouter';
import {IProfileChangePasswordBody, IProfileInfoEditBody, IProfileInfoResponse} from './types';
import {store} from '../../../store';

export class ProfileServices extends HTTPBaseRequest  {

  public changeInfo(body: IProfileInfoEditBody) {
    return this.put<IProfileInfoResponse>(`${process.env.API_URL}${Endpoints.CHANGE_USER_PROFILE}`, {
      data: JSON.stringify(body),
    }).then((user) => {
      store.setState({
        currentUser: user,
      });
      router.go('/account');
    }).catch((error: Error) => console.error(error));
  }

  public changeAvatar(body:FormData) {
    return this.put<IProfileInfoResponse>(`${process.env.API_URL}${Endpoints.CHANGE_USER_AVATAR}`, {
      data: body,
    }).then((user) => {
      store.setState({
        currentUser: user,
      });
      router.go('/account');
    }).catch((error: Error) => console.error(error));
  }

  public changePassword(body: IProfileChangePasswordBody) {
    return this.put<IProfileInfoResponse>(`${process.env.API_URL}${Endpoints.CHANGE_USER_PASSWORD}`, {
      data: JSON.stringify(body),
    }).then(() => {
      router.go('/account');
    }).catch((error: Error) => console.error(error));
  }
}
