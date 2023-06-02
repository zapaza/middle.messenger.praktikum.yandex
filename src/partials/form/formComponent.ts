import { IFormProps, IInputProps, IButtonProps } from "../../code/types";
import template from "./form.hbs";
import "./form.pcss";
import { Block } from "../../code/base/Block";
import { InputComponent } from "../input/inputComponent";
import { Button } from "../button/buttonComponent";

export class FormComponent extends Block {
    constructor(props: IFormProps) {
        super({...props});
    }

    init() {
        if (this.props.fields) {
            this.children.fields = this.props.fields.map((fieldProps: IInputProps) => new InputComponent({...fieldProps}));
        }

        if (this.props.buttons) {
            this.children.buttons = this.props.buttons.map((buttonProps: IButtonProps) => new Button({...buttonProps}));
        }
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
