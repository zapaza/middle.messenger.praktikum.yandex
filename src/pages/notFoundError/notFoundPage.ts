import { Block } from "../../code/base/Block";
import { Error } from "../../partials/error/errorComponent";
import template from "./400.hbs";
import '../../styles/error.pcss';

export class NotFoundPage extends Block {
    protected init() {
        this.children.error = new Error({
            errorCode: 400,
            errorText: 'Ой такой страницы нет',
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
