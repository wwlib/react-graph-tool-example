import AsyncToken from './AsyncToken';

export default class BtExecutorAsyncToken<T> extends AsyncToken<T> {

    public interval: any;
    public btExecutor: any;

    constructor() {
        super();
    }

    clearInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    dispose() {
        this.clearInterval();
        if(this.btExecutor){
            this.btExecutor = undefined;
        }
        super.dispose();
    }
}
