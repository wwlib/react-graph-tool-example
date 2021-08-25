import path from 'path';
import { EventEmitter } from 'events';
import AbstractData from './AbstractData';
import BehaviorTreeData from './BehaviorTreeData';
import GraphData from './GraphData';
import BehaviorTreeEngineManager from './BehaviorTreeEngineManager';

// let graphFileData = require('./data.js').default;
// let graphData = new GraphData();
// graphData.fileData = graphFileData;

export default class Model extends EventEmitter {

    private _data: AbstractData;
    private _projectRootPath: string = '';

    constructor() {
        super();
        this._data = this.newBehaviorTreeData();
        BehaviorTreeEngineManager.Instance({ appModel: this });
        this.projectRootPath = path.resolve('./test-project');
        console.log(`Model: _projectRootPath:`, this._projectRootPath);
    }

    get data(): AbstractData {
        return this._data;
    }

    get projectRootPath(): string {
        return this._projectRootPath;
    }

    set projectRootPath(path: string) {
        this._projectRootPath = path;
        BehaviorTreeEngineManager.Instance().projectRootPath = this._projectRootPath;
    }

    onDataUpdateStatus = () => {
        this.emit('tick');
    }

    loadBehaviorTreeData(filePath: string): BehaviorTreeData {
        if (this._data) {
            this._data.removeAllListeners();
        }
        const behaviorTreeData = new BehaviorTreeData();
        behaviorTreeData.load(filePath);
        this._data = behaviorTreeData;
        this._data.on('updateStatus', this.onDataUpdateStatus);
        this._data.autoLayout();
        console.log(this._data);
        return behaviorTreeData;
    }

    newBehaviorTreeData(): BehaviorTreeData {
        if (this._data) {
            this._data.removeAllListeners();
        }
        const behaviorTreeData = new BehaviorTreeData();
        this._data = behaviorTreeData;
        this._data.on('updateStatus', this.onDataUpdateStatus);
        this._data.autoLayout();
        console.log(this._data);
        return behaviorTreeData;
    }
}
