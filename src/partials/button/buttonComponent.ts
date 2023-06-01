import { Block } from "../../code/base/Block";
import { IButtonProps } from "../../code/types";
import template from "./button.hbs";
import "./button.pcss";

export class Button extends Block {
    constructor(props: IButtonProps) {
        super({...props});
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}
