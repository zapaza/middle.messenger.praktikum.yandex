import {Block} from "../../code/base/Block";
import {ButtonRoundedComponent} from "../../partials/buttonRounded/buttonRoundedComponent";
import {FormComponent} from "../../partials/form/formComponent";
import template from "./profile-settings.hbs";
import "./profile.pcss";
import {router} from "../../utils/useRouter";
import {store} from "../../store";
import {IFormProps} from '../../code/types';
import services from '../../code/services';

export class ProfileChangeAvatar extends Block {
  constructor() {
    document.title = 'Редактирование пароля';

    const defaultProps = {
      buttonBack: {
        text: 'Назад',
        events: {
          click: () => {
            router.go('/account');
          }
        }
      },
      form: {
        fields: [
          {
            label: 'Аватар',
            placeholder: 'Загрузите фото',
            name: 'avatar',
            type: 'file',
            required: true,
          },
        ],
        buttons: [
          {
            type:'submit',
            text: "Изменить",
          },
          {
            type: "button",
            isSecondary: true,
            text: "Отмена",
            events: {
              click: () => {
                router.go('/account');
              }
            }
          },
        ],
      }
    };

    super({...defaultProps});
  }

  protected init() {
    this.children.buttonBack = new ButtonRoundedComponent(this.props.buttonBack);
    this.children.form = new FormComponent(this.props.form);
    const form = this.children.form as Block<IFormProps>;

    store.subscribe(state => {
      this.setProps({
        profileName: state.currentUser.login,
        avatarUrl: `https://ya-praktikum.tech/api/v2/resources/${state.currentUser.avatar}`,
        avatarAlt: state.currentUser.first_name,
      });
      (this.children.form as Block<IFormProps>).setProps({
        formTitle: 'Изменить аватар',
        formId: 'profileChangeAvatat',
      });
    });

    form.setProps({
      events: {
        submit: async (event: Event) => {
          if (event) {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            const form = document.getElementById(target.id);
            const formData = new FormData((form as HTMLFormElement));

            await services.profileServices.changeAvatar(formData);
          }
        },
      }
    });
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
