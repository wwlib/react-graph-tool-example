import { EventEmitter } from 'events';
import AbstractData from './AbstractData';
import BehaviorTreeData from './BehaviorTreeData';
import GraphData from './GraphData';

let graphFileData = require('./data.js').default;
let graphData = new GraphData();
graphData.fileData = graphFileData;

let btFileData = require('./idle-example.bt.js').default;
let behaviorTreeData = new BehaviorTreeData();
// behaviorTreeData.load(path.resolve(__dirname, './idle-example.bt.json'));
behaviorTreeData.fileData = btFileData;

export default class Model extends EventEmitter {

    private _data: AbstractData;

    constructor() {
        super();
        this._data = behaviorTreeData; //graphData;
        console.log(this._data);
        this._data.autoLayout();
    }

    get data(): AbstractData {
        return this._data;
    }
}
