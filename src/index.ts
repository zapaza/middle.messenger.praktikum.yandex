import {NotFoundPage} from './pages/notFoundError/notFoundPage';
import {ServerErrorPage} from './pages/serverError/serverErrorPage';
import {AuthPage} from './pages/auth/authPage';
import {RegistrationPage} from './pages/registration/registrationPage';
import {ProfilePage} from './pages/profile/profilePage';
import {ProfileSettings} from './pages/profile/profileSettings';
import {ChatPage} from './pages/chat/chatPage';
import {router} from './utils/useRouter';
import services from './code/services';
import {ProfileChangePassword} from './pages/profile/profileChangePassword';
import {ProfileChangeAvatar} from './pages/profile/profileChangeAvatar';

router
  .setPublicRedirect('/messages')
  .setProtectedRedirect('/login')
  .onRoute(services.authServices.authCheck)
  .use('/', AuthPage, 'public')
  .use('/login', AuthPage, 'public')
  .use('/registration', RegistrationPage, 'public')
  .use('/messages', ChatPage, 'protected')
  .use('/messages/:id', ChatPage, 'protected')
  .use('/account', ProfilePage, 'protected')
  .use('/account-edit', ProfileSettings, 'protected')
  .use('/password-edit', ProfileChangePassword, 'protected')
  .use('/account-edit/avatar', ProfileChangeAvatar, 'protected')
  .use('/500', ServerErrorPage)
  .use('*', NotFoundPage)
  .start();
