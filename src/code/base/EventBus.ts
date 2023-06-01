import { EventBusCallback, MapInterface } from '../types';

export class EventBus<
  E extends Record<string, string> = Record<string, string>,
  Args extends Record<MapInterface<E>, any[]> = Record<string, any[]>
> {
    private events: { [K in MapInterface<E>]?: EventBusCallback<Args[K]>[] };

    constructor() {
        this.events = {};
    }

    public on<Event extends MapInterface<E>>(event: Event, callback: EventBusCallback<Args[Event]>): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event]?.push(callback);
    }

    public off<Event extends MapInterface<E>>(event: Event, callback: EventBusCallback<Args[Event]>) {
        if (!this.events[event]) {
            return;
        }

        const index = this.events[event]?.indexOf(callback);
        if (index !== -1 && index !== undefined) {
            this.events[event]?.splice(index, 1);
        }
    }

    public emit<Event extends MapInterface<E>>(event: Event, ...args: Args[Event]) {
        if (!this.events[event]) {
            return;
        }

        this.events[event]!.forEach((callback) => {
            callback(...args);
        });
    }
}
