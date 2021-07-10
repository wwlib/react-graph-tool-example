// import { useState } from 'react';
import { PortType } from '../../model/AbstractData';
import NodeUtils, { NodeClass, NodeStyle, NodeColor } from './NodeUtils';

const Node = ({ data, onMouseEvent }) => {

    // const [nodeData, setNodeData] = useState(
    //     data
    // );

    const onMouseEnter = (port) => {
        onMouseEvent('enter', port, data);
    }

    const onMouseDown = (port) => {
        onMouseEvent('down', port, data);
    }

    // const onMouseMove = (e) => {
    //     onMouseEvent('move', port, data);
    // }

    const onMouseOut = (port) => {
        onMouseEvent('out', port, data);
    }

    const onMouseUp = (port) => {
        onMouseEvent('up', port, data);
    }

    const nodeStyle: NodeStyle = NodeUtils.getNodeStyle(NodeClass.Default);
    let fill: NodeColor = nodeStyle.backgroundColor;
    if (data.isTemporary) {
        fill = NodeColor.None;
    }

    const baseRect = NodeUtils.getBaseRect({x: data.x, y: data.y});
    const inputCoords = NodeUtils.getPortCoords(PortType.Input, {x: data.x, y: data.y});
    const outputCoords = NodeUtils.getPortCoords(PortType.Output, {x: data.x, y: data.y});

    return (
        <>
            <rect x={baseRect.x} y={baseRect.y} width={baseRect.width} height={baseRect.height} rx={6}
                fill={fill}
                stroke={nodeStyle.borderColor}
                strokeWidth={data.state === 'SELECTED' ? '4px' : nodeStyle.borderWidth}
                onMouseEnter={(e) => onMouseEnter(PortType.Base)}
                onMouseDown={(e) => onMouseDown(PortType.Base)}
                // onMouseMove={(e) => onMouseMove(PortType.Base)}
                onMouseOut={(e) => onMouseOut(PortType.Base)}
                onMouseUp={(e) => onMouseUp(PortType.Base)}
            />
            <circle
                cx={inputCoords.x}
                cy={inputCoords.y}
                r={6}
                fill={nodeStyle.backgroundColor}
                stroke={nodeStyle.borderColor}
                strokeWidth={nodeStyle.borderWidth}
                onMouseEnter={(e) => onMouseEnter(PortType.Input)}
                onMouseDown={(e) => onMouseDown(PortType.Input)}
                // onMouseMove={(e) => onMouseMove('PortType.Input)}
                onMouseOut={(e) => onMouseOut(PortType.Input)}
                onMouseUp={(e) => onMouseUp(PortType.Input)}
            />
            <circle
                cx={outputCoords.x}
                cy={outputCoords.y}
                r={6}
                fill={nodeStyle.backgroundColor}
                stroke={nodeStyle.borderColor}
                strokeWidth={nodeStyle.borderWidth}
                onMouseEnter={(e) => onMouseEnter(PortType.Output)}
                onMouseDown={(e) => onMouseDown(PortType.Output)}
                // onMouseMove={(e) => onMouseMove(PortType.Output)}
                onMouseOut={(e) => onMouseOut(PortType.Output)}
                onMouseUp={(e) => onMouseUp(PortType.Output)}
            />
        </>
    )
}

export default Node