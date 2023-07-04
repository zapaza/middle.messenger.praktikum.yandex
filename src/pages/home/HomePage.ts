import { Block } from "../../code/base/block/Block";
import template from "./home.hbs";
import "./demo.pcss";

type Link = {
  link: string;
  label: string;
}

interface Props {
  pages?: Link[];
}

export class HomePage extends Block<Props> {
  init() {
    this.props.pages = [
      {
        label: 'Авторизация',
        link: '/auth',
      },
      {
        label: 'Регистрация',
        link: '/registration',
      },
      {
        label: 'Сообщения',
        link: '/messenger',
      },
      {
        label: 'Профиль',
        link: '/profile',
      },
      {
        label: 'Настройка профиля',
        link: '/profile/settings',
      },
      {
        label: 'Изменить пароль',
        link: '/profile/change-password',
      },
      {
        label: '500 ошибка',
        link: '/500',
      },
      {
        label: '400 ошибка',
        link: '/400',
      },
    ];
  }


  protected render(): DocumentFragment {
    return this.compile(template, ({...this.props}));
  }
}
