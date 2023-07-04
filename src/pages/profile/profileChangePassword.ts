import {Block} from "../../code/base/block/Block";
import {ButtonRoundedComponent} from "../../partials/buttonRounded/buttonRoundedComponent";
import {FormComponent} from "../../partials/form/formComponent";
import template from "./profile-settings.hbs";
import "./profile.pcss";
import {router} from "../../utils/useRouter";
import {store} from "../../store";
import {IFormProps, IInputProps} from '../../code/types';
import {VALIDATE_TYPES} from "../../code/dictionary/dictionary";
import {validate, validateForm} from "../../utils/validation";
import {collectingFormFields} from "../../utils/collectingFormFields";
import services from '../../code/services';
import {IProfileChangePasswordBody} from '../../code/services/ProfileServices/types';

export class ProfileChangePassword extends Block {
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
            label: 'Старый пароль',
            placeholder: 'Введите старый пароль',
            name: 'oldPassword',
            type: 'password',
            required: true,
            validateType: VALIDATE_TYPES.password,
          },
          {
            label: 'Новый пароль',
            placeholder: 'Введите новый пароль',
            name: 'newPassword',
            type: 'password',
            required: true,
            validateType: VALIDATE_TYPES.password,
          },
        ],
        buttons: [
          {
            type:'submit',
            text: "Изменить",
            disabled: true,
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
        formTitle: 'Изменить пароль',
        formId: 'profileChangePassword',
      });
      (form.children.fields as Block<IInputProps>[]).forEach((el) => {
        el.setProps({
          value: state.currentUser[el.props.name],
          events: {
            change: (event) => {
              if (event) {
                const errors = validate(
                                  el.props.validateType as VALIDATE_TYPES,
                                  (event.target! as HTMLInputElement).value,
                                  el.props.required,
                );

                el.setProps({
                  value: (event.target! as HTMLInputElement).value,
                  errorText: errors
                });
              }
            },
          }
        });
      });
    });

    form.setProps({
      events: {
        change: () => {
          const isValidForm = validateForm(form.children.fields as Block<IInputProps>[]);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          form.children.buttons[0].setProps({
            disabled: isValidForm,
          });
        },
        submit: async (event: Event) => {
          if (event) {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const data: IProfileChangePasswordBody = collectingFormFields([...target]);
            await services.profileServices.changePassword(data);
          }
        },
      }
    });
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
