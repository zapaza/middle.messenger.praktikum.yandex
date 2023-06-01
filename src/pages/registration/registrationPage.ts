import template from "./registration.hbs";
import {Block} from "../../code/base/Block";
import {IButtonProps, IInputProps} from "../../code/types";
import {FormComponent} from "../../partials/form/formComponent";
import '../auth/auth.pcss';
import {VALIDATE_TYPES} from "../../code/dictionary/dictionary";
import {validate} from "../../code/validation";

export class RegistrationPage extends Block {
    constructor() {
        super({});
    }

    protected init() {
        this.children.form = new FormComponent({
            formTitle: 'Регистрация',
            formId: 'registration',
            fields: [
                {
                    label: 'Имя',
                    placeholder: 'Введите имя',
                    name: 'first_name',
                    type: 'text',
                    value: '',
                },
                {
                    label: 'Фамилия',
                    placeholder: 'Введите фамилию',
                    name: 'second_name',
                    type: 'text',
                    value: '',
                },
                {
                    label: 'Логин',
                    placeholder: 'Введите логин',
                    name: 'login',
                    type: 'text',
                    value: '',
                },
                {
                    label: 'E-mail',
                    placeholder: 'Введите e-mail',
                    name: 'email',
                    type: 'email',
                    value: '',
                },
                {
                    label: 'Телефон',
                    placeholder: 'Введите номер телефона',
                    name: 'phone',
                    type: 'tel',
                    value: '',
                },
                {
                    label: 'Пароль',
                    placeholder: 'Введите пароль',
                    name: 'password',
                    type: 'password',
                    value: '',
                },
                {
                    label: 'Пароль (еще раз)',
                    placeholder: 'Введите пароль',
                    name: 'password2',
                    type: 'password',
                    value: '',
                }
            ],
            buttons: [
                {
                    type: 'submit',
                    text: "Зарегистрироваться",
                },
                {
                    type: "button",
                    isSecondary: true,
                    text: "Авторизоваться",
                }
            ],
        });

        const formChildren = this.children.form.children;
        const firstName = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'first_name');
        const secondName = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'second_name');
        const login = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'login');
        const email = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'email');
        const phone = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'phone');
        const password = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'password');
        const password2 = (formChildren.fields as Block<IInputProps>[]).find((el) => el?.props.name == 'password2');
        const buttonSend = (formChildren.buttons as Block<IButtonProps>[])[0];
        const buttonCancel = (formChildren.buttons as Block<IButtonProps>[])[1];

        this.inputSetProps(firstName, VALIDATE_TYPES.FIRST_NAME, true);
        this.inputSetProps(secondName, VALIDATE_TYPES.SECOND_NAME, true);
        this.inputSetProps(login, VALIDATE_TYPES.LOGIN, true);
        this.inputSetProps(email, VALIDATE_TYPES.EMAIL, true);
        this.inputSetProps(phone, VALIDATE_TYPES.PHONE_NUMBER, true);
        this.inputSetProps(password, VALIDATE_TYPES.PASSWORD, true);
        if (password2) {
            password2.setProps({
                events: {
                    change: (event) => {
                        const errors = validate(VALIDATE_TYPES.REPEAT_PASSWORD, password.props.value, true, event.target.value);

                        password2.setProps({
                            value: event.target.value,
                        });

                        if (errors) {
                            password2.setProps({errorText: errors});
                        }
                    }
                }
            });
        }
        buttonSend.setProps({
            events: {
                click: (event) => {
                    event.preventDefault();

                    console.log({
                        firstName: firstName.props.value,
                        secondName: secondName.props.value,
                        login: login.props.value,
                        email: email.props.value,
                        phone: phone.props.value,
                        password: password.props.value,
                        password2: password2.props.value,
                    });
                }
            }
        });

        buttonCancel.setProps({
            events: {
                click: () => window.location.pathname = '/auth',
            }
        });


    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
