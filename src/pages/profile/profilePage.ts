import {Block} from "../../code/base/block/Block";
import {IProfileListProps, IProfilePageProps} from "../../code/types";
import template from './profile.hbs';
import {ProfileListComponent} from "../../partials/profile/profileList/profileListComponent";
import {ButtonRoundedComponent} from "../../partials/buttonRounded/buttonRoundedComponent";
import "./profile.pcss";
import {store} from "../../store";
import {router} from "../../utils/useRouter";

export class ProfilePage extends Block {
  constructor() {
    document.title = 'Профиль';
    const defaultValues: IProfilePageProps = {
      buttonBack: {
        type: 'button',
        text: 'Назад',
        events: {
          click: () => {
            router.go('/messages');
          },
        },
      },
      settingBlock: {
        items: [
          {
            link: '/avatar-edit',
            name: 'Изменить аватар',
          },
          {
            name: 'Изменить данные',
            link: '/account-edit',
          },
          {
            link: '/password-edit',
            name: 'Изменить пароль',

          },
        ],
        isExit: true,
      }

    };

    super({...defaultValues});
  }

  init() {
    this.children.buttonBack = new ButtonRoundedComponent({...this.props.buttonBack});

    this.children.infoBlock = new ProfileListComponent({...this.props.infoBlock});
    this.children.settingBlock = new ProfileListComponent({...this.props.settingBlock});

    store.subscribe(state => {
      this.setProps({
        profileName: state.currentUser.login,
        avatarUrl: `https://ya-praktikum.tech/api/v2/resources/${state.currentUser.avatar}`,
        avatarAlt: state.currentUser.first_name,
      });
      (this.children.infoBlock as Block<IProfileListProps>).setProps({
        items: [
          {
            value: state.currentUser.email,
            name: 'Почта',
          },
          {
            value: state.currentUser.id,
            name: 'Id',
          },
          {
            value: state.currentUser.login,
            name: 'Логин',
          },
          {
            value: state.currentUser.first_name,
            name: 'Имя',
          },
          {
            value: state.currentUser.second_name,
            name: 'Фамилия',
          },
          {
            value: state.currentUser.phone,
            name: 'Телефон',
          },
          {
            value: state.currentUser.display_name,
            name: 'Отображаемое имя',
          },
        ],

      });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }

}
