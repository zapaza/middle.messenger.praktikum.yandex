import { Block } from "../../code/base/Block";
import { IProfilePageProps } from "../../code/types";
import template from './profile.hbs';
import { ProfileListComponent } from "../../partials/profile/profileList/profileListComponent";
import { ButtonRoundedComponent } from "../../partials/buttonRounded/buttonRoundedComponent";
import "./profile.pcss";

export class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        super({...props});
    }

    init() {
        this.children.buttonBack = new ButtonRoundedComponent({...this.props.buttonBack});

        this.children.infoBlock = new ProfileListComponent({...this.props.infoBlock});
        this.children.settingBlock = new ProfileListComponent({...this.props.settingBlock});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
