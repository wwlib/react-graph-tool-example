import { EventEmitter } from 'events';
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

export default class Model extends EventEmitter {

    public svgWidth: number = 1024;
    public svgHeight: number = 1024;

    private _nodes: any[];
    private _links: any[];
    private _simulation: any;
    private _nextNodeindex: number = 0;
    private _nextLinkindex: number = 0;

    constructor() {
        super();
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
        //return graphData;
        return { nodes: this._nodes, links: this._links }
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
        console.log(graphData)
        this.forceGraphData()
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
        this.disposeSimulation()
        this._simulation = d3
            .forceSimulation()
            .nodes(this._nodes)
            .force("charge", d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.svgWidth / 2, this.svgWidth / 2))
            .force("link", d3.forceLink(this._links)) // .id((d: any) => d.id))
            // .force('collision', d3.forceCollide().radius((d: any) => {
            //     return d.r;
            // }))
            .stop()
            .on("end", () => {
                console.log('simulation: end');
                this.ended()
            })
            .on('tick', this.ticked)

        for (let i = 0; i < 100; i++) {
            this._simulation.tick();
        }
        this._simulation.on('tick', this.ticked)
        this.restartSimulation()

    }

    disposeSimulation() {
        if (this._simulation) {
            this._simulation.stop()
            const nodes: any = [];
            this._simulation.nodes(nodes);
            this._simulation = undefined
        }
    }

    ticked = () => {
        this.emit('tick');
    }

    ended() {
        if (this._simulation) this._simulation.stop();
        console.log(`ended:`)
    }

    restartSimulation() {
        this._simulation.alpha(.5).restart();
    }

    resetFixedNodes() {
        this._nodes.forEach(node => {
            delete node.fx
            delete node.fy
        })
    }
}