import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import {BLOCK_EVENT, VALIDATE_TYPES} from "../dictionary/dictionary";
import {IInputProps} from "../types";
import {validate} from "../validation";

// Нельзя создавать экземпляр данного класса
export class Block<P extends Record<string, any> = any> {
    public id = nanoid(6);
    protected props: P;
    // eslint-disable-next-line no-use-before-define
    public children: Record<string, Block | Block[]>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;

    /** JSDoc
     *
     * @returns {void}
     */
    constructor(propsWithChildren: P) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(BLOCK_EVENT.INIT);
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block | Block[]> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block | Block[]> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (Array.isArray(value) && value.every(v => v instanceof Block)) {
                children[key as string] = value;
            } else if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return {props: props as P, children};
    }

    _addEvents() {
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(BLOCK_EVENT.INIT, this._init.bind(this));
        eventBus.on(BLOCK_EVENT.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(BLOCK_EVENT.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(BLOCK_EVENT.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(BLOCK_EVENT.FLOW_RENDER);
    }

    protected init() {
        return;
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
        return;
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(BLOCK_EVENT.FLOW_CDM);

        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                child.forEach(ch => ch.dispatchComponentDidMount());
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    protected inputSetProps(input: Block<IInputProps> | undefined, validateType: VALIDATE_TYPES, required: boolean) {
        if (!input) {
            return;
        }

        input.setProps({
            events: {
                change: (event) => {
                    const errors = validate(validateType, event.target.value, required);

                    input.setProps({
                        value: event.target.value,
                    });

                    if (errors) {
                        input.setProps({errorText: errors});
                    }

                }
            }
        });
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(BLOCK_EVENT.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        this._removeEvents();

        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;

        this._addEvents();
    }

    protected compile(template: (context: any) => string, context: any) {
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            if (Array.isArray(component)) {
                contextAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
            } else {
                contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
            }
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        const replaceStub = (component: Block) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        };

        Object.entries(this.children).forEach(([_, component]) => {
            if (Array.isArray(component)) {
                component.map((el) => replaceStub(el));
            } else {
                replaceStub(component);
            }
        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = {...target};

                target[prop as keyof P] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(BLOCK_EVENT.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }
}
