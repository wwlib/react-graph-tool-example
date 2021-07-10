import { useState, useEffect } from 'react';
import './BehaviorTreeContainer.css';
import { PortType } from '../../model/AbstractData';
import Node from './Node';
import Link from './Link';
import NodeSelector from './NodeSelector';
import NodeDiv from './NodeDiv';
import NodeUtils from './NodeUtils';
import Model from '../../model/Model';


export enum SelectorState {
    POINTING = 'pointing',
    SELECTED = 'selected',
    DRAGGING = 'dragging',
    DRAGGING_NEW_NODE = 'dragging_new_node',
}

let divWidth: number = 1024;
let divHeight: number = 1024;
let activeNodeData: any = null;
let enteredNodeData: any = null;
let selectorState: SelectorState = SelectorState.POINTING;
const pointerCoordinates: any = { x: 0, y: 0 };

const getCoordinates = (event: any) => {
    // const { top, left } = event.target.getBoundingClientRect();
    pointerCoordinates.x = event.clientX;
    pointerCoordinates.y = event.clientY;
    return pointerCoordinates;
}

const BehaviorTreeContainer = ({ width, height, appModel, graphData, changed }: { width: number, height: number, appModel: Model, graphData: any, changed: any }) => {
    divWidth = width;
    divHeight = height;


    const [dataset, setDataset] = useState(
        graphData
    );
    useEffect(() => { // re-render on graphData change
        setDataset(graphData);
    }, [graphData]);

    const [nodeSelectorData, setNodeSelectorData] = useState(null);

    useEffect(() => {
        setDataset(graphData);
    }, [graphData]);

    const onDivMouseMove = (event) => {
        const newCoordinates = getCoordinates(event);
        if (selectorState === SelectorState.POINTING) {

        } else if (selectorState === SelectorState.SELECTED) {
            selectorState = SelectorState.DRAGGING;
        } if ((selectorState === SelectorState.DRAGGING || selectorState === SelectorState.DRAGGING_NEW_NODE) && nodeSelectorData) {
            // update the graph dataset here - note: is a side effect that react won't see
            if (activeNodeData) {
                activeNodeData.x = newCoordinates.x;
                activeNodeData.y = newCoordinates.y;
            }
            // forces a per-event update which also renders the graph dataset
            setNodeSelectorData({
                x: newCoordinates.x,
                y: newCoordinates.y,
                port: nodeSelectorData.port,
                nodeData: activeNodeData || enteredNodeData,
            });
        }
    }

    const onDivMouseUp = (event) => {
        // console.log(`onDivMouseUp:`, selectorState);
        if (selectorState === SelectorState.DRAGGING || selectorState === SelectorState.DRAGGING_NEW_NODE) {
            selectorState = SelectorState.POINTING;
            appModel.data.keepTemporaryNodesAndLinks();
            appModel.data.onStopDraggingNode(activeNodeData);
            // force re-render
            setNodeSelectorData({
                x: activeNodeData.x,
                y: activeNodeData.y,
                port: nodeSelectorData.port,
                nodeData: activeNodeData,
            });
        }
    }

    const setActiveNode = (nodeData: any) => {
        if (activeNodeData) {
            activeNodeData.state = '';
        }
        activeNodeData = nodeData;
        activeNodeData.state = 'SELECTED';
    }

    const onNodeMouseEvent = (type, port: PortType, data) => {
        // console.log(`onNodeMouseEvent:`, type, portData, data);
        const portCoords = NodeUtils.getPortCoords(port, { x: data.x, y: data.y })
        switch (type) {
            case 'enter':
                if (selectorState !== SelectorState.DRAGGING && selectorState !== SelectorState.DRAGGING_NEW_NODE) {
                    setNodeSelectorData({
                        x: portCoords.x,
                        y: portCoords.y,
                        port: port,
                        nodeData: data,
                    });
                    enteredNodeData = data;
                    selectorState = SelectorState.POINTING;
                } else if (selectorState === SelectorState.DRAGGING_NEW_NODE && !data.isTemporary) {
                    appModel.data.linkNodes(enteredNodeData, data);
                    appModel.data.deleteTemporaryNodesAndLinks();
                    setDataset(appModel.data);
                    enteredNodeData = data;
                    selectorState = SelectorState.POINTING;
                    setActiveNode(data);
                    setNodeSelectorData({
                        x: portCoords.x,
                        y: portCoords.y,
                        port: port,
                        nodeData: data,
                    });
                }
                break;
            case 'down':
                setNodeSelectorData({
                    x: portCoords.x,
                    y: portCoords.y,
                    port: port,
                    nodeData: data,
                });
                setActiveNode(data);
                selectorState = SelectorState.SELECTED;
                changed('nodeSelected', activeNodeData);
                break;
            case 'up':
                selectorState = SelectorState.POINTING;
                break;
            case 'out':
                // if (selectorState !== SelectorState.DRAGGING) {
                //     setNodeSelectorData(null);
                //     // setDataset(dataset);
                //     selectorState = SelectorState.POINTING;
                // }
                break;
        }
    }

    const onLinkMouseEvent = (type, data) => {
        // console.log(`onLinkMouseEvent:`, type, data);
    }

    const onNodeSelectorMouseEvent = (type, data) => {
        console.log(`onNodeSelectorMouseEvent:`, type, nodeSelectorData.port, data);
        switch (type) {
            case 'down':
                const newNodeData = appModel.data.addNode(pointerCoordinates, data.nodeData, nodeSelectorData.port, true);
                if (newNodeData) {
                    setNodeSelectorData({
                        x: newNodeData.x,
                        y: newNodeData.y,
                        port: nodeSelectorData.port,
                        nodeData: newNodeData,
                    });
                    setActiveNode(newNodeData);
                    // setDataset(appModel.data);
                    // console.log(appModel.data);
                    selectorState = SelectorState.DRAGGING_NEW_NODE;
                }
                break;
        }
    }

    const onTempBoxMouseDownEvent = (e) => {
        console.log(JSON.stringify((appModel as Model).data.getFileData(), null, 2));
    }

    const rectCoords: [number, number, number, number] = [140, 140, 40, 40]; //divToSvgCoords(140, 140, 40, 40);

    return (

        <div id='graphContainer' style={{ width: divWidth, height: divHeight }} onMouseMove={onDivMouseMove} onMouseUp={onDivMouseUp} >
            <svg viewBox={`0 0 ${width} ${height}`} style={{ border: '1px solid black' }}>
                {dataset.links.map((linkData, i) => {
                    return <Link key={i} data={linkData} onMouseEvent={onLinkMouseEvent} />
                })}
                {dataset.nodes.map((nodeData, i) => (
                    <Node key={i} data={nodeData} onMouseEvent={onNodeMouseEvent} />
                ))}
                <rect x={rectCoords[0]} y={rectCoords[1]} width={rectCoords[2]} height={rectCoords[3]} />
                <NodeSelector data={nodeSelectorData} onMouseEvent={onNodeSelectorMouseEvent} />
            </svg>
            <div id='tempBox' onMouseDown={onTempBoxMouseDownEvent}></div>
            {dataset.nodes.map((nodeData, i) => (
                <NodeDiv key={i} data={nodeData} appModel={appModel} onMouseEvent={onNodeMouseEvent} />
            ))}
        </div>
    )
}

export default BehaviorTreeContainer