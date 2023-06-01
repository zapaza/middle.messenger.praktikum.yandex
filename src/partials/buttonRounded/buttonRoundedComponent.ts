import { Block } from "../../code/base/Block";
import { IButtonProps } from "../../code/types";
import template from "./buttonRounded.hbs";
import "./button.pcss";

export class ButtonRoundedComponent extends Block {
    constructor(props: IButtonProps) {
        super({...props});
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
