import { IErrorProps } from "../../code/types";
import { Block } from "../../code/base/Block";
import { Button } from "../button/buttonComponent";
import template from "./error.hbs";

export class Error extends Block {
    constructor(props: IErrorProps) {
        super({...props});
    }

    protected init() {
        this.children.button = new Button({...this.props.button});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
