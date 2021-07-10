// import { useState } from 'react';

const NodeSelector = ({ data, onMouseEvent }) => {

    // const [nodeSelectorData, setNodeSelectorData] = useState(
    //     data || { x: 0, y: 0}
    // );

    // const onMouseEnter = (event) => {
    //     onMouseEvent('enter', data);
    // }

    const onMouseDown = (event) => {
        event.preventDefault();
        onMouseEvent('down', data);
    }

    // const onMouseMove = (e) => {
    //     onMouseEvent('move', data);
    // }

    // const onMouseOut = (e) => {
    //     onMouseEvent('out', data);
    // }

    // const onMouseUp = (e) => {
    //     onMouseEvent('up', data);
    // }

    return (
        <circle
            cx={data ? data.x : 0}
            cy={data ? data.y : 0}
            r="10"
            fill="none"
            stroke="lightblue"
            strokeWidth="10"
            // onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            // onMouseOut={onMouseOut}
            // onMouseUp={onMouseUp}
        />
    )
}

export default NodeSelector