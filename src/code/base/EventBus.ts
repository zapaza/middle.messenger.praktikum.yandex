type Callback = (...args: unknown[]) => void;

export class EventBus {
    private events: { [key: string]: Callback[] };

    constructor() {
        this.events = {};
    }

    public on(event: string, callback: Callback): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    public off(event: string, callback: Callback): void {
        if (!this.events[event]) {
            return;
        }
        const index = this.events[event].indexOf(callback);
        if (index !== -1) {
            this.events[event].splice(index, 1);
        }
    }

    public emit(event: string, ...args: unknown[]): void {
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((callback) => {
            callback(...args);
        });
    }
}
