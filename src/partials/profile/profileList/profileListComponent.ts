import './profileList.pcss';
import template from './profileList.hbs';
import { Block } from "../../../code/base/Block";
import { IProfileListProps } from "../../../code/types";

export class ProfileListComponent extends Block {
    constructor(props: IProfileListProps) {
        super({...props});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
