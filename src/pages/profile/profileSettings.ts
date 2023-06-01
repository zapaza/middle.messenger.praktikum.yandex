import { Block } from "../../code/base/Block";
import { IProfileSettingsPageProps } from "../../code/types";
import { ButtonRoundedComponent } from "../../partials/buttonRounded/buttonRoundedComponent";
import { FormComponent } from "../../partials/form/formComponent";
import template from "./profile-settings.hbs";
import "./profile.pcss";

export class ProfileSettings extends Block {
    constructor(props: IProfileSettingsPageProps) {
        super({ ...props});
    }

    protected init() {
        this.children.buttonBack = new ButtonRoundedComponent({...this.props.buttonBack});

        this.children.form = new FormComponent({...this.props.form});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
