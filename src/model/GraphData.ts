import { v4 as uuidv4 } from 'uuid';
import AbstractData, { NodeData, LinkData, PortType } from './AbstractData';

const d3 = require('d3');

export default class GraphData extends AbstractData {

    private _simulation: any;

    constructor() {
        super();
    }

    processFileData(): any {
        this._nodes = this._fileData.nodes;
        this._links = this._fileData.links;
    }

    // TODO
    getFileData(): any {
        this._nodes.forEach(node => {
            node.position = {
                x: node.x,
                y: node.y,
            }
        });
        return this._fileData;
    }

    addNode(coordinates: any, sourceNode: any = null, port: PortType, isTemporary: boolean = false): any {
        const newNode: any = {
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
        this._fileData.nodes.push(newNode);
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
                isTemporary: isTemporary,
            }
            this._fileData.links.push(newLink);
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
        }
        this._fileData.links.push(newLink);
    }

    updateNode(event: string, nodeData: NodeData): void {
        switch(event) {
            case 'TBD':
                break;
        }
    }

    onStopDraggingNode(node: NodeData): void {
        
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
            }
        });
        this._nodes = updatedNodes;

        const updatedLinks: any[] = [];
        this._links.forEach((linkData: LinkData) => {
            if (!linkData.isTemporary) {
                updatedLinks.push(linkData);
            }
        });
        this._links = updatedLinks;

        this._fileData = {
            nodes: this._nodes,
            links: this._links,
        }
    }

    autoLayout() {
        this._simulation = d3
            .forceSimulation(this._nodes)
            .force("link", d3.forceLink(this._links).id((d: any) => d.id))
            .force("charge", d3.forceManyBody().strength(-1500))
            .force('center', d3.forceCenter(1024 / 2, 1024 / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            // .on('tick', this.ticked)

            // .on("end", () => {
            //     console.log('forceGraphData: end');
            //     console.log(this.nodes);
            // })
            .stop();

        for (let i=0; i<100; i++) {
            this._simulation.tick();
        }
        this.ticked();
    }

    ticked = () => {
        this.emit('tick');
    }
}
