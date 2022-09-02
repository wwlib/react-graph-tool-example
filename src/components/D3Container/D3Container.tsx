import * as React from 'react';
// import { useState } from 'react';
import * as d3Zoom from 'd3-zoom';
import { select } from 'd3'
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

let activeNodeData: any = null;
let enteredNodeData: any = null;
let selectorState: SelectorState = SelectorState.POINTING;
const pointerCoordinates: any = { x: 0, y: 0 };
let dragged = false;

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

const getCoordinates = (event: any) => {
    // const { top, left } = event.target.getBoundingClientRect();
    pointerCoordinates.x = event.clientX;
    pointerCoordinates.y = event.clientY;
    return pointerCoordinates;
}

const D3Container = ({ width, height, appModel, graphData }) => {
    let divWidth = width;
    let divHeight = height;

    const [dataset, setDataset] = React.useState(
        graphData
    );
    const [nodeSelectorData, setNodeSelectorData] = React.useState(null);

    //// d3 zoom - TODO: This will work, but all svg mouse events must be controlled by d3

    //const svgRef = React.createRef(); // https://reactjs.org/docs/refs-and-the-dom.html
    const svgRef = React.useRef(null); // Using React (Hooks) with D3 – [16] Zoomable Line Chart - https://www.youtube.com/watch?v=dxUyI2wfYSI
    // https://observablehq.com/@d3/programmatic-zoom
    // https://www.sanity.io/guides/import-svg-files-in-react
    // https://www.geeksforgeeks.org/reactjs-finddomnode-method/
    // https://dev.to/taowen/make-react-svg-component-draggable-2kc



    // React.useEffect(() => {
    //     const svg = select(svgRef.current)
    //     document.body.addEventListener("wheel", e => {
    //         e.preventDefault();//prevent zoom
    //     });
    //     console.log(`D3Contaner: useEffect:`, svg)
    //     const zoom = d3Zoom.zoom().on("zoom", function (event) {
    //         // event.preventDefault()
    //         console.log(`zoom`, event.transform)
    //         svg.attr("transform", event.transform);
    //     })
    //     svg.call(zoom)

    // }, [dataset])

    const onDivMouseMove = (event) => {
        const newCoordinates = getCoordinates(event);
        newCoordinates.x += window.scrollX
        newCoordinates.y += window.scrollY
        // console.log(`onDivMouseMove: state: ${selectorState}`);
        if (selectorState === SelectorState.POINTING) {

        } else if (selectorState === SelectorState.SELECTED) {
            selectorState = SelectorState.DRAGGING;
        } if ((selectorState === SelectorState.DRAGGING || selectorState === SelectorState.DRAGGING_NEW_NODE) && nodeSelectorData) {
            // update the graph dataset here - note: vis a side effect that react won't see
            if (activeNodeData) {
                activeNodeData.x = activeNodeData.fx = newCoordinates.x;
                activeNodeData.y = activeNodeData.fy = newCoordinates.y;
                dragged = true;
                appModel.restartSimulation()
            }
            // forces a per-event update which also renders the graph dataset
            setNodeSelectorData({
                x: newCoordinates.x,
                y: newCoordinates.y,
                nodeData: activeNodeData || enteredNodeData,
            });
        }
    }

    const onTempMouseUp = (event) => {
        // console.log(`onTempMouseUp:`);
        appModel.resetFixedNodes();
        appModel.restartSimulation()
    }

    const onDivMouseUp = (event) => {
        // console.log(`onDivMouseUp:`, selectorState);
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
        // console.log(`onNodeMouseEvent:`, type, data);
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
                dragged = false;
                selectorState = SelectorState.SELECTED;
                break;
            case 'up':
                activeNodeData = data;
                // console.log(`onNodeMouseEvent: dragged:`, dragged)
                if (!dragged && activeNodeData) {
                    delete activeNodeData.fx;
                    delete activeNodeData.fy;
                }
                selectorState = SelectorState.POINTING;
                
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
        // console.log(`onNodeSelectorMouseEvent:`, type, data);
        switch (type) {
            case 'down':
                const newNodeData = appModel.addNode(pointerCoordinates, data.nodeData, true);
                setNodeSelectorData({
                    x: newNodeData.x,
                    y: newNodeData.y,
                    nodeData: newNodeData,
                });
                activeNodeData = newNodeData; //newNodeData;
                selectorState = SelectorState.DRAGGING_NEW_NODE;
                break;
        }
    }

    const rectCoords: [number, number, number, number] = [140, 140, 40, 40]; //divToSvgCoords(140, 140, 40, 40);
    return (

        <div id='graphContainer' style={{ width: divWidth, height: divHeight }} onMouseMove={onDivMouseMove} onMouseUp={onDivMouseUp} >
            <svg ref={svgRef} width={appModel.svgWidth} height={appModel.svgHeight} viewBox={`0 0 ${width} ${height}`} style={{ border: '1px solid black' }}>
                {dataset.links.map((linkData, i) => {
                    return <Link key={i} data={linkData} onMouseEvent={onLinkMouseEvent} />
                })}
                {dataset.nodes.map((nodeData, i) => (
                    <Node key={i} data={nodeData} onMouseEvent={onNodeMouseEvent} />
                ))}
                <rect x={rectCoords[0]} y={rectCoords[1]} width={rectCoords[2]} height={rectCoords[3]} style={{ border: '1px solid black' }} />
                <NodeSelector data={nodeSelectorData} onMouseEvent={onNodeSelectorMouseEvent} />
            </svg>
            <div id='tempBox' onMouseUp={onTempMouseUp}></div>
        </div>
    )
}

export default D3Container