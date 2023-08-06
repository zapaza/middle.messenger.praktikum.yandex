import "./input.pcss";
import template from "./input.hbs";
import { IInputProps } from "../../code/types";
import { Block } from "../../code/base/block/Block";

export class InputComponent extends Block {
  constructor(props: IInputProps) {
    super({...props});
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
