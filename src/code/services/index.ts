import { AuthServices } from "./AuthServices/AuthServices";
import { ChatsServices } from "./ChatsServices/ChatsServices";
import {ProfileServices} from './ProfileServices/ProfileServices';
import {DialogServices} from './DialogServices/DialogServices';

const authServices = new AuthServices();
const chatServices = new ChatsServices();
const profileServices = new ProfileServices();
const dialogServices = (userId: number, token: string, chatId: number) => new DialogServices(userId, token, chatId);

export default {
  authServices,
  chatServices,
  profileServices,
  dialogServices,
};
