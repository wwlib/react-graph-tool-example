import { EventEmitter } from 'events';
import AbstractData from './AbstractData';
import BehaviorTreeData from './BehaviorTreeData';
import GraphData from './GraphData';

// let graphFileData = require('./data.js').default;
// let graphData = new GraphData();
// graphData.fileData = graphFileData;

export default class Model extends EventEmitter {

    private _data: AbstractData;

    constructor() {
        super();
        this._data = this.newBehaviorTreeData();
    }

    get data(): AbstractData {
        return this._data;
    }

    loadBehaviorTreeData(filePath: string): BehaviorTreeData {
        const behaviorTreeData = new BehaviorTreeData();
        behaviorTreeData.load(filePath);
        this._data = behaviorTreeData;
        this._data.autoLayout();
        console.log(this._data);
        return behaviorTreeData;
    }

    newBehaviorTreeData(): BehaviorTreeData {
        const behaviorTreeData = new BehaviorTreeData();
        this._data = behaviorTreeData;
        this._data.autoLayout();
        console.log(this._data);
        return behaviorTreeData;
    }
}
