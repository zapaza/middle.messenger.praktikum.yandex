import { Block } from "../../code/base/Block";
import {IButtonProps, IInputProps, IProfileSettingsPageProps} from "../../code/types";
import { ButtonRoundedComponent } from "../../partials/buttonRounded/buttonRoundedComponent";
import { FormComponent } from "../../partials/form/formComponent";
import template from "./profile-settings.hbs";
import "./profile.pcss";
import {VALIDATE_TYPES} from "../../code/dictionary/dictionary";

export class ProfileSettings extends Block {
    constructor(props: IProfileSettingsPageProps) {
        super({ ...props});
    }

    protected init() {
        this.children.buttonBack = new ButtonRoundedComponent({...this.props.buttonBack});
        this.children.form = new FormComponent({...this.props.form});

        const formFields = this.children.form.children.fields;
        const email = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='email');
        const displayName = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='display_name');
        const login = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='login');
        const firstName = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='first_name');
        const secondName = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='second_name');
        const phone = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='phone');
        const file = (formFields as Block<IInputProps>[])?.find((el) => el?.props.name ==='file');
        const buttonSend = (this.children.form.children.buttons as Block<IButtonProps>[])[0];

        this.inputSetProps(email, VALIDATE_TYPES.EMAIL, false);
        this.inputSetProps(displayName, VALIDATE_TYPES.LOGIN, false);
        this.inputSetProps(login, VALIDATE_TYPES.LOGIN, false);
        this.inputSetProps(firstName, VALIDATE_TYPES.FIRST_NAME, false);
        this.inputSetProps(secondName, VALIDATE_TYPES.SECOND_NAME, false);
        this.inputSetProps(phone, VALIDATE_TYPES.PHONE_NUMBER, false);

        buttonSend.setProps({
            events: {
                click: (event) => {
                    event.preventDefault();

                    console.log({
                        email: email?.props.value,
                        displayName: displayName?.props.value,
                        login: login?.props.value,
                        firstName: firstName?.props.value,
                        secondName: secondName?.props.value,
                        phone: phone?.props.value,
                        file: file?.props.value,
                    });
                }
            }
        });

    }

    render() {
        return this.compile(template, {...this.props});
    }
}
