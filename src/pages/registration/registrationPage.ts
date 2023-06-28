import template from "./registration.hbs";
import {Block} from "../../code/base/Block";
import {IButtonProps, IInputProps} from "../../code/types";
import {FormComponent} from "../../partials/form/formComponent";
import '../auth/auth.pcss';
import {VALIDATE_TYPES} from "../../code/dictionary/dictionary";
import {validate, validateForm} from "../../utils/validation";
import {collectingFormFields} from "../../utils/collectingFormFields";
import {ISingUpBody} from "../../code/services/AuthServices/types";
import services from "../../code/services";

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  componentDidMount() {
    this.children.form = new FormComponent({
      formTitle: 'Регистрация',
      formId: 'registration',
      fields: [
        {
          label: 'Имя',
          placeholder: 'Введите имя',
          name: 'first_name',
          type: 'text',
          required: true,
          validateType: VALIDATE_TYPES.first_name
        },
        {
          label: 'Фамилия',
          placeholder: 'Введите фамилию',
          name: 'second_name',
          type: 'text',
          required: true,
          validateType: VALIDATE_TYPES.second_name
        },
        {
          label: 'Логин',
          placeholder: 'Введите логин',
          name: 'login',
          type: 'text',
          required: true,
          validateType: VALIDATE_TYPES.login,
          rule: 'от 3 до 20 символов, латиница, может содержать цифры',
        },
        {
          label: 'E-mail',
          placeholder: 'Введите e-mail',
          name: 'email',
          type: 'email',
          required: true,
          validateType: VALIDATE_TYPES.email,
        },
        {
          label: 'Телефон',
          placeholder: 'Введите номер телефона',
          name: 'phone',
          type: 'tel',
          required: true,
          validateType: VALIDATE_TYPES.phone,
        },
        {
          label: 'Пароль',
          placeholder: 'Введите пароль',
          name: 'password',
          type: 'password',
          required: true,
          validateType: VALIDATE_TYPES.password,
          rule: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        },
      ],
      buttons: [
        {
          type: 'submit',
          text: "Зарегистрироваться",
          disabled: true,
        },
        {
          type: "button",
          isSecondary: true,
          text: "Авторизоваться",
        }
      ],
    });

    const formChildren = this.children.form.children;
    const buttonSend = (formChildren.buttons as Block<IButtonProps>[])[0];
    const buttonCancel = (formChildren.buttons as Block<IButtonProps>[])[1];

    (formChildren.fields as Block<IInputProps>[]).forEach((el) => {
      el.setProps({
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

    this.children.form.setProps({
      events: {
        change: () => {
          const isValidForm = validateForm(formChildren.fields as Block<IInputProps>[]);

          buttonSend.setProps({
            disabled: isValidForm,
          });
        },
        submit: async (event: Event) => {
          if (event) {
            event.preventDefault();
            const target = event.target as HTMLFormElement;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const data = collectingFormFields([...target]);
            await services.authServices.singUp(data as ISingUpBody);
          }
        },
      }
    });

    buttonCancel.setProps({
      events: {
        click: () => window.location.pathname = '/login',
      }
    });


  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
