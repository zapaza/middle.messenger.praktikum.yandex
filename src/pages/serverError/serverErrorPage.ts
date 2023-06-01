import { Block } from "../../code/base/Block";
import { Error } from "../../partials/error/errorComponent";
import template from "./500.hbs";
import '../../styles/error.pcss';

export class ServerErrorPage extends Block {
    protected init() {
        this.children.error = new Error({
            errorCode: 500,
            errorText: 'Умс, ошибочка, мы уже разбираемся',
            button: {
                text: 'Вернуться назад',
                isSecondary: true,
                events: {
                    click: (event) => {
                        event.preventDefault();
                        window.location.pathname = '/';

                    }
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }

}
