// import { useState } from 'react';
import { PortType } from '../../model/AbstractData';
import NodeUtils from './NodeUtils';

const Link = ({ data, onMouseEvent }) => {

    // const [nodeData, setNodeData] = useState(
    //     data
    // );

    // const onMouseEnter = (event) => {
    //     onMouseEvent('enter', data);
    // }

    // const onMouseDown = (event) => {
    //     onMouseEvent('down', data);
    // }

    // const onMouseMove = (e) => {
    //     onMouseEvent('move', data);
    // }

    // const onMouseOut = (e) => {
    //     onMouseEvent('out', data);
    // }

    // const onMouseUp = (e) => {
    //     onMouseEvent('up', data);
    // }

    const sourceCoords = NodeUtils.getPortCoords(PortType.Output, {x: data.source.x, y: data.source.y});
    const targetCoords = NodeUtils.getPortCoords(PortType.Input, {x: data.target.x, y: data.target.y});

    return (
        <line
            x1={sourceCoords.x}
            y1={sourceCoords.y}
            x2={targetCoords.x}
            y2={targetCoords.y}
            stroke='dimgrey'
            strokeWidth={1}
            
            // onMouseEnter={onMouseEnter}
            // onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            // onMouseOut={onMouseOut}
            // onMouseUp={onMouseUp}
        />
    )
}

export default Link