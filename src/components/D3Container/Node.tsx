// import { useState } from 'react';

const Node = ({ data, onMouseEvent }) => {

    // const [nodeData, setNodeData] = useState(
    //     data
    // );

    const onMouseEnter = (event) => {
        onMouseEvent('enter', data);
    }

    const onMouseDown = (event) => {
        onMouseEvent('down', data);
    }

    // const onMouseMove = (e) => {
    //     onMouseEvent('move', data);
    // }

    const onMouseOut = (e) => {
        onMouseEvent('out', data);
    }

    const onMouseUp = (e) => {
        onMouseEvent('up', data);
    }

    let fill = "#DA7194";
    if (data.isTemporary) {
        fill = "none";
    }

    return (
        <circle
            cx={data.x}
            cy={data.y}
            r="30"
            fill={fill}
            stroke="#cc3c6c"
            strokeWidth="3px"
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
            onMouseUp={onMouseUp}
        />
    )
}

export default Node