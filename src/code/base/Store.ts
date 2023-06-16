import { TState } from '../types';
import { EventBus } from './EventBus';
import { cloneDeep, isEqual, merge } from '../../utils';
import { STORE_EVENTS } from '../dictionary/dictionary';

export class Store {
    private _state: TState;

    private _oldState: TState;

    // eslint-disable-next-line @typescript-eslint/ban-types
    private _subscribers: Function[];

    private eventBus: () => EventBus;

    constructor(initialState: TState = {}) {
        const eventBus = new EventBus();
        this._state = this._makeStateProxy(initialState);
        this._oldState = { ...this._state };
        this._subscribers = [];
        this.eventBus = () => eventBus;

        // Регистрируем события жизненного цикла
        eventBus.on(STORE_EVENTS.INIT, this._init.bind(this));
        eventBus.on(STORE_EVENTS.STORE_DM, this._storeDidMount.bind(this));
        eventBus.on(STORE_EVENTS.STORE_DU, this._storeDidUpdate.bind(this));
        eventBus.on(STORE_EVENTS.USE, this._use.bind(this));

        eventBus.emit(STORE_EVENTS.INIT);
    }

    private _init() {
        this.eventBus().emit(STORE_EVENTS.STORE_DM);
    }

    private _storeDidMount() {
        this.storeDidMount();
    }

    public storeDidMount() {
        return;
    }

    private _storeDidUpdate(oldState: TState, newState: TState) {
        const response = this.storeDidUpdate(oldState, newState);
        if (response) {
            this.eventBus().emit(STORE_EVENTS.USE);
        }
    }

    public storeDidUpdate(oldState: TState = {}, newState: TState = {}) {
        return !isEqual(oldState, newState);
    }

    private _use() {
        this._subscribers.forEach((subscriber) => {
            subscriber(this._state);
        });
    }

    public subscribe(subscriber: (state: TState) => void) {
        this._subscribers.push((subscriber));
        subscriber(this._state);
    }

    public setState(newState: TState) {
        if (!newState) {
            return;
        }
        const merged = merge(cloneDeep(this._state), newState);
        Object.assign(this._state, merged);
    }

    public getState() {
        return this._state;
    }

    private _makeStateProxy(state: TState) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return new Proxy(state, {
            set: (target: TState, item: string, value: unknown) => {
                const t = target;
                t[item] = value;
                this.eventBus().emit(STORE_EVENTS.STORE_DU, self._oldState, t);
                self._oldState = { ...t };
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            },
        });
    }
}
