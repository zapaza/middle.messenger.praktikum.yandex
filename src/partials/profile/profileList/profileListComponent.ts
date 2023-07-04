import './profileList.pcss';
import template from './profileList.hbs';
import { Block } from "../../../code/base/block/Block";
import { IProfileListProps } from "../../../code/types";
import {Button} from "../../button/buttonComponent";
import services from '../../../code/services';

export class ProfileListComponent extends Block {
  constructor(props: IProfileListProps) {
    super({...props});
  }


  componentDidMount() {
    if (this.props.isExit) {
      this.children.exitButton = new Button({
        events: {
          click: () => services.authServices.logout()
        },
        text: 'Выйти',
        type: "button",
      });
    }

  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}
