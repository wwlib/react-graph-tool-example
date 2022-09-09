// import { useState } from 'react';

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

    return (
        <line
            x1={data.source.x}
            y1={data.source.y}
            x2={data.target.x}
            y2={data.target.y}
            stroke='#A0A5AF'
            strokeWidth={2}
            
            // onMouseEnter={onMouseEnter}
            // onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            // onMouseOut={onMouseOut}
            // onMouseUp={onMouseUp}
        />
    )
}

export default Link