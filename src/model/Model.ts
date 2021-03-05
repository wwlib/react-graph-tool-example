import { v4 as uuidv4 } from 'uuid';

const d3 = require('d3');
let graphData = require('./data.js').default;

export type NodeData = {
    index: number;
    id: string;
    group: number;
    properties: any;
    labels: string[],
    position: {
        x: number;
        y: number;
    };
    x?: number;
    y?: number;
    isTemporary?: boolean;
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
    linknum: number;
    isTemporary?: boolean;
}

export default class Model {

    private _nodes: any[];
    private _links: any[];
    private _simulation: any;
    private _nextNodeindex: number = 0;
    private _nextLinkindex: number = 0;

    constructor() {
        console.log(graphData);
        this._nodes = graphData.nodes;
        this._links = graphData.links;
        this.updateNodeIndices();
        this.updateLinkIndices();
        this.forceGraphData();
    }

    get nodes(): any {
        return this._nodes;
    }

    get links(): any {
        return this._links;
    }

    get data(): any {
        return graphData;
    }

    updateNodeIndices() {
        this._nodes.forEach((nodeData: NodeData) => {
            nodeData.index = this._nextNodeindex++;
        });
    }

    updateLinkIndices() {
        this._links.forEach((linkData: LinkData) => {
            linkData.linknum = this._nextLinkindex++;
        });
    }

    keepTemporaryNodesAndLinks() {
        this._nodes.forEach((nodeData: NodeData) => {
            if (nodeData.isTemporary) {
                nodeData.isTemporary = false;
            }
        });

        this._links.forEach((linkData: LinkData) => {
            if (linkData.isTemporary) {
                linkData.isTemporary = false;
            }
        });
    }

    deleteTemporaryNodesAndLinks() {
        const updatedNodes: any[] = [];
        this._nodes.forEach((nodeData: NodeData) => {
            if (!nodeData.isTemporary) {
                updatedNodes.push(nodeData);
            } else {
                this._nextLinkindex = nodeData.index;
            }
        });
        this._nodes = updatedNodes;

        const updatedLinks: any[] = [];
        this._links.forEach((linkData: LinkData) => {
            if (!linkData.isTemporary) {
                updatedLinks.push(linkData);
            } else {
                this._nextLinkindex = linkData.linknum;
            }
        });
        this._links = updatedLinks;

        graphData = {
            nodes: this._nodes,
            links: this._links,
        }
    }

    addNode(coordinates: any, sourceNode: any = null, isTemporary: boolean = false): any {
        const newNode: any = {
            index: this._nextNodeindex++,
            id: uuidv4(),
            group: 1,
            properties: {
                name: '',
                id: '',
            },
            labels: [],
            position: {
                x: coordinates.x,
                y: coordinates.y,
            },
            x: coordinates.x,
            y: coordinates.y,
            isTemporary: isTemporary,
        }
        graphData.nodes.push(newNode);
        if (sourceNode) {
            const newLink = {
                source: sourceNode,
                target: newNode,
                value: 0,
                id: uuidv4(),
                type: 'RELATIONSHIP',
                startNode: sourceNode.id,
                endNode: newNode.id,
                properties: {},
                linknum: this._nextLinkindex++,
                isTemporary: isTemporary,
            }
            graphData.links.push(newLink);
        }
        return newNode;
    }

    linkNodes(sourceNode: NodeData, targetNode: NodeData) {
        const newLink = {
            source: sourceNode,
            target: targetNode,
            value: 0,
            id: uuidv4(),
            type: 'RELATIONSHIP',
            startNode: sourceNode.id,
            endNode: targetNode.id,
            properties: {},
            linknum: this._nextLinkindex++,
        }
        graphData.links.push(newLink);
    }

    forceGraphData(): any {
        this._simulation = d3
            .forceSimulation(this._nodes)
            .force("link", d3.forceLink(this._links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody().strength(-1500))
            .force('center', d3.forceCenter(1024 / 2, 1024 / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .stop()
            .tick(300)

        // this._simulation.on("end", () => {
        //     console.log('forceGraphData: end');
        //     console.log(this.nodes);
        // });
    }
}