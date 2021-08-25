import { EventEmitter } from 'events';
import PathUtils from '../utils/PathUtils';
import flowRuntime, {
    FlowExecutor,
    FlowRootFactory,
    Runtime,
    GojsLoader,
    State,
    Blackboard,
} from 'interaction-flow-engine';
import Model from './Model';
import BtExecutorAsyncToken from './BtExecutorAsyncToken';
import BehaviorTreeData, { Status } from '../model/BehaviorTreeData';

export type BehaviorTreeEngineManagerOptions = {
    appModel?: Model;
}

export default class BehaviorTreeEngineManager extends EventEmitter {

    private static _instance: BehaviorTreeEngineManager;
    private _activeBtExecutorToken: BtExecutorAsyncToken<any> | undefined;
    private _appModel: Model | undefined;
    private _behaviorTree: any | undefined;

    constructor(options?: BehaviorTreeEngineManagerOptions) {
        super();
        if (options?.appModel) {
            this._appModel = options?.appModel;
        }
    }

    static Instance(options?: BehaviorTreeEngineManagerOptions) {
        return this._instance || (this._instance = new this(options));
    }

    // init(appModel: Model): void {
    //     this._appModel = appModel;
    // }

    set projectRootPath(path: string) {
        // interaction-flow-engine: set project root
        Runtime.instance.setRoot(path);
    }

    get behaviorTree(): any {
        return this._behaviorTree;
    }

    run(step: boolean = false, behaviorTreeUri?: string) {
        if (!this._activeBtExecutorToken) {
            let uri: string | undefined = behaviorTreeUri;
            if (!uri && this._appModel) {
                uri = this._appModel.data.filePath;
            }
            if (uri) {
                console.log(`BehaviorTreeEngineManager: run:`, uri);
                this._activeBtExecutorToken = this.executeBehaviorTree(uri, step);
                this._activeBtExecutorToken.complete?.then((status: Status) => {
                    console.log(`run: done: status:`, Status[status]);
                });
            }
        } else {
            this._activeBtExecutorToken.btExecutor.proceedToStatus(Status.SUCCEEDED, () => {
                console.log('DONE.');
                if (this._activeBtExecutorToken) {
                    console.log(`tree result:`, this._activeBtExecutorToken.btExecutor.tree.result);
                    this._activeBtExecutorToken.btExecutor.stop();
                }
            });
        }
    }

    step() {
        if (this._activeBtExecutorToken) {
            this._activeBtExecutorToken.btExecutor.step();
        } else {
            this.run(true);
        }
    }

    cancel() {
        if (this._activeBtExecutorToken) {
            this.cancelExecution(this._activeBtExecutorToken)
                .then(() => {
                    console.log(`canceled.`);
                });
        }
    }

    updateBehaviorTreeStatus() {
        if (this._behaviorTree && this._behaviorTree.map) {
            const keys: string[] = Object.keys(this._behaviorTree.map);
            keys.forEach(key => {
                const component: any = this._behaviorTree.map[key];
                if (component) {
                    const currentStatus = component._currentStatus;
                    (this._appModel?.data as BehaviorTreeData).updateBtNodeStatus(key, currentStatus);
                }
            });
        }
    }

    executeBehaviorTree(behaviorTreeUri: string, step: boolean = false): BtExecutorAsyncToken<any> {
        const token = new BtExecutorAsyncToken();
        token.complete = new Promise<void>((resolve, reject) => {

            const btExecutor: any = {};

            btExecutor.step = () => {
                // console.log(`btExecutor.step`);
                const status = btExecutor.tree.update();
                console.log(`btExecutor.step: Status:`, Status[status]);
                this.updateBehaviorTreeStatus();
            }

            btExecutor.proceedToStatus = (targetStatus: string, done: any) => {
                console.log(`btExecutor.proceedToStatus`);
                btExecutor.interval = setInterval(() => {
                    const status = btExecutor.tree.update();
                    // console.log(`btExecutor.proceedToStatus: Status:`, Status[status])
                    this.updateBehaviorTreeStatus();
                    if (status === targetStatus) {
                        done();
                    }
                }, 0);
            };

            this._behaviorTree = flowRuntime.bt.create(behaviorTreeUri, {
                notepad: {},
                blackboard: {},
            });
            btExecutor.tree = this._behaviorTree;
            console.log(`btExecutor.tree`, btExecutor.tree);

            btExecutor.stop = () => {
                console.log(`btExecutor.stop`);
                if (btExecutor.interval) clearInterval(btExecutor.interval);
                btExecutor.interval = null;
                const status = btExecutor.tree.stop();
                console.log(`stop: final status:`, Status[status]);
                this._behaviorTree = undefined;
                this._activeBtExecutorToken = undefined;
                resolve(status);
            }

            let status = btExecutor.tree.start();
            console.log(status, Status[status]);

            if (step) {
                btExecutor.step();
            } else {
                btExecutor.proceedToStatus(Status.SUCCEEDED, () => {
                    console.log('DONE.');
                    btExecutor.stop();
                    console.log(`tree result:`, btExecutor.tree.result);
                });
            }


            token.btExecutor = btExecutor;

            // token.interval = setInterval(() => {
            //     executor.update();
            //     token.emit('update', executor.context.current_activity);
            //     if (executor.context.current_activity.class === 'Flow.End') {
            //         clearInterval(token.interval);
            //         console.log(executor.context.current_activity.activity.class);
            //         resolve();
            //     }
            // }, 10);

        });

        return token;
    }

    cancelExecution(token: BtExecutorAsyncToken<any>): Promise<void> {
        if (token && token.btExecutor) {
            token.btExecutor.stop();
        }
        (this._appModel?.data as BehaviorTreeData).resetBtStatus();

        // console.log(Status[status]);
        // status = token.btExecutor.tree.currentStatus
        // console.log(Status[status]);

        // let executor = token.btExecutor;
        token.dispose();
        // if (executor) {
        //     return executor.stopAndDestroy();
        // } else {
        //     return Promise.resolve();
        // }
        this._activeBtExecutorToken = undefined;
        return Promise.resolve();
    }

}