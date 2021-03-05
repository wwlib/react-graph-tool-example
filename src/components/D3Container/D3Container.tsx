import { useState } from 'react';
// import useInterval from './useInterval';
import Node from './Node';
import Link from './Link';
import NodeSelector from './NodeSelector';
import "./D3Container.css";

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

// const generateDataset = () => (
//     Array(10).fill(0).map((value, i) => {
//         return {
//             id: i,
//             x: Math.random() * 800 + 100,
//             y: Math.random() * 350 + 100,
//         }
//     })
// );

// const onMouseEnter = (event) => {
//     console.log(event);
// }

// const onMouseDown = (event) => {
//     console.log(event);
// }

// const divToSvgCoords = (x: number, y: number, width: number, height: number): [number, number, number, number] => {
//     let svgX: number = 0;
//     let svgY: number = 0;
//     let svgWidth: number = 0;
//     let svgHeight: number = 0;

//     svgX = x / divWidth * 100;
//     svgY = y / divHeight * 100;
//     svgWidth = width / divHeight * 100;
//     svgHeight = height / divHeight * 100;

//     return [svgX, svgY, svgWidth, svgHeight];
// }

// const getCoordinates = (event: any) => {
//     const { top, left } = event.target.getBoundingClientRect();
//     return {
//         x: event.clientX - left,
//         y: event.clientX - parseInt(top, 10),
//     };
// }

const getCoordinates = (event: any) => {
    // const { top, left } = event.target.getBoundingClientRect();
    pointerCoordinates.x = event.clientX;
    pointerCoordinates.y = event.clientY;
    return pointerCoordinates;
}

const D3Container = ({ width, height, appModel }) => {
    divWidth = width;
    divHeight = height;
    

    const [dataset, setDataset] = useState(
        appModel.data
    );
    const [nodeSelectorData, setNodeSelectorData] = useState(null);

    // console.log(dataset);

    // useInterval(() => {
    //     const newDataset = generateDataset()
    //     setDataset(newDataset)
    // }, 2000)

    const onDivMouseMove = (event) => {
        const newCoordinates = getCoordinates(event);
        // console.log(`onDivMouseMove: state: ${selectorState}`);
        if (selectorState === SelectorState.POINTING) {

        } else if (selectorState === SelectorState.SELECTED) {
            selectorState = SelectorState.DRAGGING;
        } if ((selectorState === SelectorState.DRAGGING || selectorState === SelectorState.DRAGGING_NEW_NODE) && nodeSelectorData) {
            // console.log(newCoordinates);
            // update the graph dataset here - note: vis a side effect that react won't see
            if (activeNodeData) {
                activeNodeData.x = newCoordinates.x;
                activeNodeData.y = newCoordinates.y;
            }
            // forces a per-event update which also renders the graph dataset
            setNodeSelectorData({
                x: newCoordinates.x,
                y: newCoordinates.y,
                nodeData: activeNodeData || enteredNodeData,
            });
        }
    }

    const onDivMouseUp = (event) => {
        console.log(`onDivMouseUp:`, selectorState);
        // setNodeSelectorData(null);
        // setDataset(dataset);
        if (selectorState === SelectorState.DRAGGING || selectorState === SelectorState.DRAGGING_NEW_NODE) {
            selectorState = SelectorState.POINTING;
            appModel.keepTemporaryNodesAndLinks();
            // force re-render
            setNodeSelectorData({
                x: activeNodeData.x,
                y: activeNodeData.y,
                nodeData: activeNodeData,
            });
        }
    }

    const onNodeMouseEvent = (type, data) => {
        console.log(`onNodeMouseEvent:`, type, data);
        switch (type) {
            case 'enter':
                if (selectorState != SelectorState.DRAGGING && selectorState != SelectorState.DRAGGING_NEW_NODE) {
                    setNodeSelectorData({
                        x: data.x,
                        y: data.y,
                        nodeData: data,
                    });
                    enteredNodeData = data;
                    selectorState = SelectorState.POINTING;
                } else if (selectorState === SelectorState.DRAGGING_NEW_NODE && !data.isTemporary) {
                    appModel.linkNodes(enteredNodeData, data);
                    appModel.deleteTemporaryNodesAndLinks();
                    setDataset(appModel.data);
                    enteredNodeData = data;
                    selectorState = SelectorState.POINTING;
                    activeNodeData = data;
                    setNodeSelectorData({
                        x: data.x,
                        y: data.y,
                        nodeData: data,
                    });
                }
                break;
            case 'down':
                setNodeSelectorData({
                    x: data.x,
                    y: data.y,
                    nodeData: data,
                });
                activeNodeData = data;
                selectorState = SelectorState.SELECTED;
                break;
            case 'up':
                // setNodeSelectorData(null);
                selectorState = SelectorState.POINTING;
                // setDataset(dataset);
                break;
            case 'out':
                // if (selectorState != SelectorState.DRAGGING) {
                //     setNodeSelectorData(null);
                //     // setDataset(dataset);
                //     selectorState = SelectorState.POINTING;
                // }
                break;
        }
    }

    const onLinkMouseEvent = (type, data) => {
        console.log(`onLinkMouseEvent:`, type, data);
    }

    const onNodeSelectorMouseEvent = (type, data) => {
        console.log(`onNodeSelectorMouseEvent:`, type, data);
        switch (type) {
            case 'down':
                const newNodeData = appModel.addNode(pointerCoordinates, data.nodeData, true);
                setNodeSelectorData({
                    x: newNodeData.x,
                    y: newNodeData.y,
                    nodeData: newNodeData,
                });
                activeNodeData = newNodeData; //newNodeData;
                // setDataset(appModel.data);
                // console.log(appModel.data);
                selectorState = SelectorState.DRAGGING_NEW_NODE;
                break;
        }
    }

    const rectCoords: [number, number, number, number] = [140, 140, 40, 40]; //divToSvgCoords(140, 140, 40, 40);
    // console.log(nodeSelectorData);
    return (

        <div id='graphContainer' style={{ width: divWidth, height: divHeight }} onMouseMove={onDivMouseMove} onMouseUp={onDivMouseUp} >
            <svg viewBox={`0 0 ${width} ${height}`} style={{ border: '1px solid black' }}>
                {dataset.links.map((linkData, i) => {
                    return <Link key={i} data={linkData} onMouseEvent={onLinkMouseEvent} />
                })}
                {dataset.nodes.map((nodeData, i) => (
                    <Node key={i} data={nodeData} onMouseEvent={onNodeMouseEvent} />
                ))}
                <rect x={rectCoords[0]} y={rectCoords[1]} width={rectCoords[2]} height={rectCoords[3]} style={{ border: '1px solid black' }} />
                <NodeSelector data={nodeSelectorData} onMouseEvent={onNodeSelectorMouseEvent} />
            </svg>
            <div id='tempBox'></div>
        </div>
    )
}

export default D3Container