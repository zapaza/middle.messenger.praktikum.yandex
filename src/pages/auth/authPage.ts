import template from './auth.hbs';
import {Block} from '../../code/base/block/Block';
import {IButtonProps, IFormProps, IInputProps} from '../../code/types';
import {FormComponent} from '../../partials/form/formComponent';
import {VALIDATE_TYPES} from '../../code/dictionary/dictionary';
import {router} from '../../utils/useRouter';
import {validateForm, validate} from '../../utils/validation';
import {collectingFormFields} from '../../utils/collectingFormFields';
import services from '../../code/services';
import {ISingInBody} from '../../code/services/AuthServices/types';
import './auth.pcss';

export class AuthPage extends Block {
  constructor() {
    document.title = 'Авторизация';
    super({});
  }

  componentDidMount() {
    this.children.form = new FormComponent({
      formTitle: 'Авторизация',
      formId: 'auth',
      fields: [
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
          label: 'Пароль',
          placeholder: 'Введите пароль',
          name: 'password',
          type: 'password',
          validateType: VALIDATE_TYPES.password,
          required: true,
          rule: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
        },
      ],
      buttons: [
        {
          type: 'submit',
          text: 'Войти',
          disabled: true,
        },
        {
          type: 'button',
          isSecondary: true,
          text: 'Нет аккаунта?',
        },
      ],
    });
    const formChildren = (this.children.form as Block<IFormProps>).children;
    if (formChildren.fields && formChildren.buttons) {
      const loginInput = (formChildren.fields as Block<IInputProps>[]).find((el) => el.props.name == 'login');
      const passwordInput = (formChildren.fields as Block<IInputProps>[]).find((el) => el.props.name == 'password');
      const buttonSend = (formChildren.buttons as Block<IButtonProps>[])[0];
      const buttonCancel = (formChildren.buttons as Block<IButtonProps>[])[1];

      loginInput?.setProps({
        events: {
          change: (event) => {
            if (event) {
              const errors = validate(
                VALIDATE_TYPES.login,
                (event.target! as HTMLInputElement).value,
                loginInput?.props.required,
              );

              loginInput.setProps({
                value: (event.target! as HTMLInputElement).value,
                errorText: errors,
              });
            }
          },
        },
      });

      passwordInput?.setProps({
        events: {
          change: (event) => {
            if (event) {
              const errors = validate(
                VALIDATE_TYPES.password,
                (event.target! as HTMLInputElement).value,
                passwordInput?.props.required,
              );

              passwordInput.setProps({
                value: (event.target! as HTMLInputElement).value,
                errorText: errors,
              });
            }
          },
        },
      });

      (this.children.form as Block<IFormProps>).setProps({
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
              await services.authServices.signIn(data as ISingInBody);
            }
          },
        },
      });

      buttonCancel.setProps({
        events: {
          click: (event) => {
            event.preventDefault();
            router.go('/registration');
          },
        },
      });
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
