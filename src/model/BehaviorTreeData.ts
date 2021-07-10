import { v4 as uuidv4 } from 'uuid';
import AbstractData, { NodeData, LinkData, PortType } from './AbstractData';


export default class BehaviorTreeData extends AbstractData {

    protected _nodeMap: any = {};
    protected _decoratorMap: any = {};

    constructor() {
        super();
    }

    processFileData(): any {
        const btNodeIds: string[] = Object.keys(this._fileData);
        btNodeIds.forEach(nodeId => {
            if (nodeId === 'meta') {
                return;
            }
            let btNode = this._fileData[nodeId];
            if (btNode.parent || btNode.children || btNode.decorators) { // leaf and composite nodes have parents
                this.addBtNodeFromFileData(btNode);
            } else {
                this._decoratorMap[btNode.id] = btNode;
            }

            if (!this._rootNode && btNode.parent) {
                this._rootNode = btNode;
                while (this._rootNode.parent) {
                    this._rootNode = this._fileData[this._rootNode.parent];
                }
                if (!this._nodeMap[this._rootNode.id]) { // if not already added
                    this.addBtNodeFromFileData(this._rootNode); // no parent, but add it
                }
            }
        });
        this._nodes.forEach(node => {
            if (node.properties.btNode.parent) {
                this.linkNodes(this._nodeMap[node.properties.btNode.parent], node);
            }
        });
        // console.log(this._links);
    }

    addBtNodeFromFileData(btNode: any) {
        const btNodeId: string = `${btNode.id}`;
        const node: any = {
            id: 0,
            group: 1,
            properties: {
                // name: btNode.name,
                btNode: btNode,
            },
            labels: [],
            position: btNode.position || { x: 0, y: 0 },
            x: btNode.position ? btNode.position.x : 0,
            y: btNode.position ? btNode.position.y : 0,
        }
        this._nodes.push(node);
        node.id = this._nodes.length - 1;
        this._nodeMap[btNodeId] = node;
        return node;
    }

    addNode(coordinates: any, sourceNode: any = null, port: PortType, isTemporary: boolean = false): any {
        // console.log(`addNode: sourceNode:`, sourceNode, port, sourceNode.properties.btNode.parent);
        let newNode: any = undefined;
        if (port == PortType.Output || (port == PortType.Input && !sourceNode.properties.btNode.parent)) {
            if (sourceNode) {
                newNode = {
                    id: 0, //uuidv4(),
                    group: 1,
                    properties: {
                        // name: '',
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
                this._nodes.push(newNode);
                newNode.id = this._nodes.length - 1;
                const btNode = this.createBtNode(sourceNode.properties.btNode, coordinates.x, coordinates.y, port);
                const btNodeId: string = `${btNode.id}`;
                this._nodeMap[btNodeId] = newNode;
                // newNode.properties.name = btNode.name;
                newNode.properties.btNode = btNode;
                switch (port) {
                    case PortType.Input:
                        this.linkNodes(newNode, sourceNode);
                        break;
                    case PortType.Output:
                        this.linkNodes(sourceNode, newNode);
                        break;
                }
            }
        } else {
            console.log(`BehaviorTreeData: addNode: ERROR: nodes can have only 1 parent.`);
        }
        return newNode;
    }

    createBtNode(sourceBtNode: any, x: number, y: number, port: PortType, nodeClass?: string, name?: string): any {
        // console.log(`BehaviorTreeData: createBtNode: sourceBtNode:`, sourceBtNode, port);
        let newBtNode: any = undefined;
        const newId = uuidv4();
        if (sourceBtNode) {
            newBtNode = {
                id: newId,
                class: nodeClass || 'Null',
                name: name || `${newId.substring(0, 3)}: ${nodeClass}`,
                "asset-pack": "core",
                // parent: '',
                children: [
                ],
                decorators: [
                ],
                options: {},
                position: {
                    x: x,
                    y: y,
                }
            }
            if (port === PortType.Input) {
                sourceBtNode.parent = newId;
                newBtNode.children = [sourceBtNode.id];
            } else if (port === PortType.Output) {
                newBtNode.parent = sourceBtNode.id;
                if (sourceBtNode.children) {
                    sourceBtNode.children.push(newId);
                } else {
                    sourceBtNode.children = [newId];
                }                
            }
        } else {
            console.log(`BehaviorTreeData: createBtNode: ERROR: no sourceBtNode.`);
        }
        return newBtNode;
    }

    removeBtNode(btNode: any): boolean {
        let result = false;
        const parentNode = this._nodeMap[btNode.parent];
        console.log(`BehaviorTreeData: removeBtNode`, btNode, parentNode);
        if (!btNode.children || btNode.children.length === 0) {
            if (btNode.decorators) {
                btNode.decorators.forEach((decoratorId: string) => {
                    delete this._decoratorMap[decoratorId];
                });
            }
            if (parentNode) {
                const parentBtNode = parentNode.properties.btNode;
                if (parentBtNode && parentBtNode.children) {
                    const newChildIds: any[] = [];
                    parentBtNode.children.forEach((childId: string) => {
                        if (btNode.id !== childId) {
                            newChildIds.push(childId);
                        }
                        parentBtNode.children = newChildIds;
                    });
                }
            }
            delete this._nodeMap[btNode.id];
            result = true;
        } else {
            console.log(`BehaviorTreeData: removeBtNode: ERROR. Cannot delete node with children.`, btNode);
        }
        return result;
    }

    removeNode(nodeToRemove: NodeData) {
        // console.log(`BehaviorTreeData: removeNode`, nodeToRemove);
        const btNode = nodeToRemove.properties.btNode;
        const btNodeRemoved: boolean = this.removeBtNode(btNode);
        if (btNodeRemoved) {
            const newNodes: NodeData[] = [];
            this._nodes.forEach((node: NodeData) => {
                if (nodeToRemove.id !== node.id) {
                    newNodes.push(node);
                    node.id = `${newNodes.length - 1}`;
                }
            });
            this._nodes = newNodes;
            this._links = [];
            this._nodes.forEach(node => {
                if (node.properties.btNode.parent) {
                    this.linkNodes(this._nodeMap[node.properties.btNode.parent], node);
                }
            });
            console.log(this._nodes);
            console.log(this._links);
        }
    }

    createDecoratorNode(parentBtNode: any, nodeClass?: string, name?: string): any {
        let newDecoratorNode: any = undefined;
        const newId = uuidv4();
        if (parentBtNode) {
            newDecoratorNode = {
                id: newId,
                class: nodeClass || 'WhileCondition',
                name: name || `${newId.substring(0, 3)}: ${nodeClass}`,
                "asset-pack": "core",
                options: {
                    init: [
                        "() => {",
                        "}"
                    ],
                    conditional: [
                        "() => {",
                        "  return true;",
                        "}"
                    ]
                }
            }
        }
        if (!parentBtNode.decorators) {
            parentBtNode.decorators = [];
        }
        parentBtNode.decorators.push(newId);
        this._decoratorMap[newDecoratorNode.id] = newDecoratorNode;
        return newDecoratorNode;
    }

    removeDecoratorNode(parent: any, decorator: any): void {
        if (parent.decorators) {
            const newDecorators: string[] = [];
            parent.decorators.forEach((id: string) => {
                if (id !== decorator.id) {
                    newDecorators.push(id);
                }
            });
            parent.decorators = newDecorators;
        }
        delete this._decoratorMap[decorator.id];
    }

    linkNodes(startNode: any, endNode: any) {
        const link: any = {
            source: this._nodes[startNode.id],
            target: this._nodes[endNode.id],
            id: 0,
            type: 'RELATIONSHIP',
            startNode: startNode.id,
            endNode: endNode.id,
            properties: {
            },
        }
        this._links.push(link);
        link.id = this._links.length - 1;
        return link;
    }

    updateNode(event: string, data: any): void {
        // console.log(`BehaviorTreeData: updateNode:`, event, data);
        switch (event) {
            case 'addDecorator':
                // console.log(event, data);
                if (data) {
                    this.createDecoratorNode(data);
                }
                break;
            case 'removeDecorator':
                // console.log(event, data);
                if (data) {
                    this.removeDecoratorNode(data.parent, data.decorator);
                }
                break;
            case 'updateNode':
                // console.log(event, data);
                if (data) {
                    const btNodeId = data.id;
                    const node = this._nodeMap[btNodeId];
                    const btNode = node.properties.btNode;
                    Object.keys(data).forEach(key => {
                        btNode[key] = data[key];
                    });
                    // node.properties.name = btNode.name;
                }
                break;
            case 'updateDecorator':
                // console.log(event, data);
                if (data) {
                    const btDecoratorId = data.id;
                    const btDecorator = this._decoratorMap[btDecoratorId];
                    Object.keys(data).forEach(key => {
                        // console.log(`key: ${key}`, btDecorator[key], data[key]);
                        btDecorator[key] = data[key];
                    });
                }
                break;
            case 'removeNode':
                this.removeNode(data);
                break;
        }
    }

    onStopDraggingNode(node: NodeData): void {
        const btNode = node.properties.btNode;
        btNode.position.x = node.x;
        btNode.position.y = node.y;
        if (btNode) {
            const node = this._nodeMap[btNode.parent];
            const parentBtNode = node ? node.properties.btNode : undefined;
            if (parentBtNode && parentBtNode.children) {
                const childBtNodes: any[] = [];
                parentBtNode.children.forEach((childId: string) => {
                    childBtNodes.push(this._nodeMap[childId].properties.btNode);
                });
                childBtNodes.sort((btNodeA: any, btNodeB): number => {
                    return btNodeA.position.x - btNodeB.position.x
                });
                parentBtNode.children = childBtNodes.map((node: any) => {
                    return node.id;
                });
            }
        }
    }

    getFileData(): any {
        this._nodes.forEach(node => {
            node.position = {
                x: node.x,
                y: node.y,
            }
            node.properties.btNode.position = {
                x: node.x,
                y: node.y,
            }
        });
        const newFileData: any = {};
        Object.keys(this._nodeMap).forEach((key: string) => {
            newFileData[key] = this._nodeMap[key].properties.btNode;
        });
        Object.keys(this._decoratorMap).forEach((key: string) => {
            newFileData[key] = this._decoratorMap[key];
        });
        newFileData['meta'] = this._fileData.meta || { "version": 1 };
        return newFileData;
    }

    getDecoratorNodeWithBtNodeId(btNodeId: string): any[] {
        return this._decoratorMap[btNodeId];
    }

    getDecoratorNodesWithBtNodeId(btNodeId: string): any[] {
        const result: any[] = [];
        const node = this._nodeMap[btNodeId];
        const btNode = node.properties.btNode;
        if (btNode && btNode.decorators) {
            btNode.decorators.forEach((decoratorNodeId: string) => {
                const decoratorNode = this.getDecoratorNodeWithBtNodeId(decoratorNodeId);
                result.push(decoratorNode);
            });
        }
        return result;
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
    }
}