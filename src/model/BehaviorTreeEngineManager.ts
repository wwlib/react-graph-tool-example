import { EventEmitter } from 'events';
import PathUtils from '../utils/PathUtils';
import flowRuntime, {
    FlowExecutor,
    FlowRootFactory,
    Runtime,
    BehaviorTree,
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
                try {
                    this._activeBtExecutorToken = this.executeBehaviorTree(uri, step);
                    this._activeBtExecutorToken.complete?.then((status: Status) => {
                        console.log(`run: done: status:`, Status[status]);
                    });
                } catch (e) {
                    console.log(`BehaviorTreeEngineManager: run: ERROR:`, e);
                    if (this._activeBtExecutorToken) {
                        this._activeBtExecutorToken.dispose();
                    }
                    this._activeBtExecutorToken = undefined;
                }
            }
        } else {
            if (this._activeBtExecutorToken.btExecutor) {
                this._activeBtExecutorToken.btExecutor.proceedToStatus(Status.SUCCEEDED, () => {
                    console.log('DONE.');
                    if (this._activeBtExecutorToken) {
                        console.log(`tree result:`, this._activeBtExecutorToken.btExecutor.tree.result);
                        this._activeBtExecutorToken.btExecutor.stop();
                    }
                });
            } else {
                console.log(`BehaviorTreeEngineManager: run: ERROR: btExecutor is undefined`);
            }
        }
    }

    step() {
        if (this._activeBtExecutorToken) {
            if (this._activeBtExecutorToken.btExecutor) {
                this._activeBtExecutorToken.btExecutor.step();
            } else {
                console.log(`BehaviorTreeEngineManager: step: ERROR: btExecutor is undefined`);
            }
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

    updateBehaviorTreeStatus(nodeMap: any, previousStatusMap: any) {
        // console.log(`updateBehaviorTreeStatus:`, nodeMap, previousStatusMap);
        if (nodeMap && previousStatusMap) {
            const btNodeIds = Object.keys(nodeMap);
            btNodeIds.forEach(btNodeId => {
                const node = nodeMap[btNodeId];
                if (node) {
                    const currentStatus = node._currentStatus;
                    if (!previousStatusMap[btNodeId]) {
                        previousStatusMap[btNodeId] = currentStatus;
                    }
                    (this._appModel?.data as BehaviorTreeData).updateBtNodeStatus(btNodeId, currentStatus, previousStatusMap);
                }
            });
        }
    }

    executeBehaviorTree(behaviorTreeUri: string, step: boolean = false): BtExecutorAsyncToken<any> {
        const token = new BtExecutorAsyncToken();
        let previousStatusMap: any = {};
        let nodeMap: any = {};
        token.complete = new Promise<void>((resolve, reject) => {

            const btExecutor: any = {};

            btExecutor.step = () => {
                // console.log(`btExecutor.step`);
                const status = btExecutor.tree.update();
                console.log(`btExecutor.step: Status:`, Status[status]);
                this.updateBehaviorTreeStatus(nodeMap, previousStatusMap);
            }

            btExecutor.proceedToStatus = (targetStatus: string, done: any) => {
                console.log(`btExecutor.proceedToStatus`);
                btExecutor.interval = setInterval(() => {
                    const status = btExecutor.tree.update();
                    // console.log(`btExecutor.proceedToStatus: Status:`, Status[status])
                    this.updateBehaviorTreeStatus(nodeMap, previousStatusMap);
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

            previousStatusMap = {};
            nodeMap = BehaviorTree.getNodeMap(btExecutor.tree);
            const keys = Object.keys(nodeMap);
            keys.forEach(key => {
                const node = nodeMap[key];
                previousStatusMap[node.id] = node._currentStatus;
                // console.log(node.name, Status[node._currentStatus], Status[previousStatusMap[node.id]]);
            });

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
        });

        return token;
    }

    cancelExecution(token: BtExecutorAsyncToken<any>): Promise<void> {
        if (token && token.btExecutor) {
            token.btExecutor.stop();
        }
        (this._appModel?.data as BehaviorTreeData).resetBtStatus();

        token.dispose();

        this._activeBtExecutorToken = undefined;
        return Promise.resolve();
    }

}