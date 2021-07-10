// import { useState } from 'react';
// import NodeUtils, { PortType } from './NodeUtils';
import './NodePropertiesEditor.css';
import Model from '../../model/Model';
import BehaviorTreeData from '../../model/BehaviorTreeData';

const Decorators = ({ node, appModel, onMouseEvent }: { node: any, appModel: Model, onMouseEvent: any }) => {

    const selectDecorator = (data) => {
        onMouseEvent('select', data);
    }

    const removeDecorator = (data) => {
        onMouseEvent('remove', data);
    }

    const addDecorator = (data) => {
        onMouseEvent('add', data);
    }

    const decoratorElements = [];
    let behaviorTreeData: BehaviorTreeData = appModel.data as BehaviorTreeData;
    if (node) {
        const decoratorNodes = behaviorTreeData.getDecoratorNodesWithBtNodeId(node.properties.btNode.id);
        if (decoratorNodes && decoratorNodes.length > 0) {
            decoratorNodes.forEach(decoratorNode => {
                const element = <div className="DecoratorRow" key={decoratorNode.id} onMouseDown={() => selectDecorator(decoratorNode)} >
                    <div className="Decorator">{ `${decoratorNode.class}: ${decoratorNode.name}`}</div>
                    <button className="DecoratorButton" onMouseDown={() => removeDecorator({parent: node.properties.btNode, decorator: decoratorNode})}>-</button>
                </div>
                decoratorElements.push(element);
            });
        }
    }

    return (
        <div className="Decorators">
            {decoratorElements}
            <button className="DecoratorButton" onMouseDown={() => addDecorator(node.properties.btNode)}>+</button>
        </div>
    )
}

export default Decorators