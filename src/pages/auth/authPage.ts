import template from "./auth.hbs";
import {Block} from "../../code/base/Block";
import {IButtonProps, IInputProps} from "../../code/types";
import {FormComponent} from "../../partials/form/formComponent";
import './auth.pcss';
import {VALIDATE_TYPES} from "../../code/dictionary/dictionary";

export class AuthPage extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.form = new FormComponent({
            formTitle: 'Авторизация',
            formId: 'auth',
            fields: [
                {
                    label: 'Логин',
                    placeholder: 'Введите логин',
                    name: 'login',
                    type: 'text',
                    value: '',
                    rule: 'от 3 до 20 символов, латиница, может содержать цифры',
                },
                {
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                    name: 'password',
                    type: 'password',
                    value: '',
                    rule: 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
                }
            ],
            buttons: [
                {
                    type: "submit",
                    text: "Войти",
                },
                {
                    type: "button",
                    isSecondary: true,
                    text: "Нет аккаунта?",
                }
            ],
        });

        const formChildren = this.children.form.children;
        const loginInput = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'login');
        const passwordInput = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'password');
        const buttonSend = (formChildren.buttons as Block<IButtonProps>[])[0];
        const buttonCancel = (formChildren.buttons as Block<IButtonProps>[])[1];

        this.inputSetProps(loginInput, VALIDATE_TYPES.LOGIN, true);
        this.inputSetProps(passwordInput, VALIDATE_TYPES.PASSWORD, true);

        buttonSend.setProps({
            events: {
                click: (event) => {
                    event.preventDefault();

                    console.log({
                        login: loginInput?.props.value,
                        password: passwordInput?.props.value,
                    });
                }
            }
        });

        buttonCancel.setProps({
            events: {
                click: () => window.location.pathname = '/registration',
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
