// import { useState } from 'react';
import "./BehaviorTreeContainer.css";
import NodeUtils, { NodeClass } from "./NodeUtils";

const NodeDiv = ({ data, appModel, onMouseEvent }) => {

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

    const divRect = NodeUtils.getDivRect({ x: data.x, y: data.y });
    const btNode = data.properties.btNode;
    let firstDecorator = undefined;
    if (btNode.decorators && btNode.decorators[0]) {
        firstDecorator = appModel.data.getDecoratorNodeWithBtNodeId(btNode.decorators[0]);
    }

    const decoratorClassName = `nodeDecorator ${firstDecorator ? 'hasNodeDecorator' : ''}`

    let div = <div></div>
    if (!data.isTemporary) {
        div = <div className='nodeDiv' style={divRect}>
            <div className={decoratorClassName}>
                { firstDecorator ? `${firstDecorator.class}` : ''}
            </div>
            <div className='nodeclass'>
                {btNode.class}
            </div>
            <div className='nodeName'>
                {btNode.name}
            </div>
        </div>
    }

    return (
        div
    )
}

export default NodeDiv