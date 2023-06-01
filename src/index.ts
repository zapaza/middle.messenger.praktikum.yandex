import { HomePage } from "./pages/home/HomePage";
import { NotFoundPage } from "./pages/notFoundError/notFoundPage";
import { ServerErrorPage } from "./pages/serverError/serverErrorPage";
import { AuthPage } from "./pages/auth/authPage";
import {
    ChatPageMock,
    ProfileChangePasswordMock,
    ProfilePageMock,
    ProfileSettingsMock,
} from "./mock";
import {  RegistrationPage  } from "./pages/registration/registrationPage";
import { ProfilePage } from "./pages/profile/profilePage";
import { ProfileSettings } from "./pages/profile/profileSettings";
import {ChatPage} from "./pages/chat/chatPage";

const app = document.querySelector('#app') as HTMLDivElement;
const route = window.location.pathname;

const routes: Record<string, () => void> = {
    '/': () => {
        document.title = 'Список страниц';
        const page = new HomePage({});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/auth': () => {
        document.title = 'Авторизация';
        const page = new AuthPage();
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/registration': () => {
        document.title = 'Регистрация';
        const page = new RegistrationPage();
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/messenger': () => {
        document.title = 'Сообщения';
        const page = new ChatPage({...ChatPageMock});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/profile': () => {
        document.title = 'Профиль';
        const page = new ProfilePage({...ProfilePageMock});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/profile/settings': () => {
        document.title = 'Настройка профиля';
        const page = new ProfileSettings({...ProfileSettingsMock});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/profile/change-password': () => {
        document.title = 'Изменение пароля';
        const page = new ProfileSettings({...ProfileChangePasswordMock});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    '/500': () => {
        document.title = 'Ошибка сервера';
        const page = new ServerErrorPage({});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    },
    'default': () => {
        document.title = 'Такой страницы нет';
        const page = new NotFoundPage({});
        app.append(page.getContent() as HTMLElement);
        page.dispatchComponentDidMount();
    }
};

function loadResources(path: string) {
    const page = routes[path] || routes['default'];

    return page();
}

document.addEventListener('DOMContentLoaded', () => {

    loadResources(route);
});
