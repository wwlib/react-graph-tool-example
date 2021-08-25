import jsonfile from 'jsonfile';
import { EventEmitter } from 'events';

export type NodeData = {
    id: string;
    group: number;
    properties: any;
    labels: string[],
    layout: {
        x: number;
        y: number;
    };
    x?: number;
    y?: number;
    isTemporary?: boolean;
    state?: string;
}

export type LinkData = {
    source: NodeData;
    target: NodeData;
    value: number;
    id: number;
    type: string;
    startNode: number; // node id
    endNode: number; // node id
    properties: any;
    isTemporary?: boolean;
    state?: string;
}

export enum PortType { // connection port for links
    Base = 'base',
    Input = 'input',
    Output = 'output',
}

export default abstract class AbstractData extends EventEmitter {

    protected _fileData: any = {};
    protected _filePath: string = 'untitled.json';
    protected _rootNode: any;
    protected _nodes: any[] = [];
    protected _links: any[] = [];

    constructor() {
        super();
    }

    get fileData(): any {
        return this._fileData;
    }

    get filePath(): string {
        return this._filePath;
    }

    set filePath(path: string) {
        this._filePath = path;
    }

    get rootNode(): any {
        return this._rootNode;
    }

    get nodes(): any[] {
        return this._nodes;
    }

    get links(): any[] {
        return this._links;
    }

    get nodesAndLinks(): any {
        return {
            nodes: this._nodes,
            links: this._links,
        }
    }

    load(filePath: string) {
        this._nodes = [];
        this._links = [];
        this._fileData = jsonfile.readFileSync(filePath);
        this._filePath = filePath;
        this.processFileData();
    }

    saveToFile(filePath?: string) {
        if (filePath || this._filePath) {
            const fileData = this.getFileData();
            jsonfile.writeFileSync(filePath || this._filePath, fileData, { spaces: 2 });
        }
    }

    // Abstract methods

    abstract init(filePath: string): void;
    
    abstract processFileData(): any;

    abstract getFileData(): any;

    abstract addNode(coordinates: any, sourceNode: any, port: PortType, isTemporary: boolean): any;

    abstract linkNodes(sourceNode: NodeData, targetNode: NodeData): void;

    abstract keepTemporaryNodesAndLinks(): void;

    abstract deleteTemporaryNodesAndLinks(): void;

    abstract autoLayout(): void;

    abstract updateNode(event: string, nodeData: NodeData): void;

    abstract onStopDraggingNode(node: NodeData): void;
}