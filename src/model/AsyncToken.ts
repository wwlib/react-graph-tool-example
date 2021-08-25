import { EventEmitter } from 'events';

export default class AsyncToken<T> extends EventEmitter {

    public complete: Promise<T> | undefined;

    constructor() {
        super();
    }

    dispose() {
        this.removeAllListeners();
        this.complete = undefined;
    }
}
