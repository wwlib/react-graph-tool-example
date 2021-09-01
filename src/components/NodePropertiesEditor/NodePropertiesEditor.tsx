import React, { Component } from 'react';
import './NodePropertiesEditor.css';
import Model from '../../model/Model';
import BehaviorTreeData from '../../model/BehaviorTreeData'
import Decorators from './Decorators';
import DecoratorPropertiesEditor from './DecoratorPropertiesEditor';
import RunPanel from './RunPanel';

export interface NodePropertiesEditorProps {
    data: any;
    appModel: Model;
    changed: any;
}

export interface NodePropertiesEditorState {
    data: any;
    text: string;
    decoratorData: any;
}

export default class NodePropertiesEditor extends Component<NodePropertiesEditorProps, NodePropertiesEditorState> {

    constructor(props: NodePropertiesEditorProps) {
        super(props);
        let firstDecorator = {};
        this.state = {
            data: this.props.data,
            text: this.props.data ? JSON.stringify(this.props.data.properties.btNode, null, 2) : '',
            decoratorData: firstDecorator,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: NodePropertiesEditorProps) {
        if (nextProps.data !== this.props.data) {
            // console.log(`NodePropertiesEditor: UNSAFE_componentWillReceiveProps: new data:`, nextProps.data);
            let firstDecorator = {};
            if (nextProps.data) {
                const btNode = nextProps.data.properties.btNode;
                if (btNode.decorators && btNode.decorators[0]) {
                    firstDecorator = (nextProps.appModel.data as BehaviorTreeData).getDecoratorNodeWithBtNodeId(btNode.decorators[0]);
                }
            }
            this.setState({
                data: nextProps.data,
                text: nextProps.data ? JSON.stringify(nextProps.data.properties.btNode, null, 2) : '',
                decoratorData: firstDecorator,
            }, () => {

            });
        }
    }

    public onChange = (event: any) => {
        let nativeEvent: any = event.nativeEvent;
        switch (nativeEvent.target.name) {
            case 'text':
                this.setState({
                    text: nativeEvent.target.value
                });
                break;
        }
    }

    public onNodeChanged = (event: any) => {
        let btNodeData;
        try {
            btNodeData = JSON.parse(this.state.text);
        } catch (e) {
            console.log(`onNodeChanged: ERROR: parsing JSON`);
        }
        if (btNodeData) {
            this.props.changed('updateNode', btNodeData);
        }
    }

    onDecoratorMouseEvent = (action, data) => {
        switch (action) {
            case 'select':
                this.setState({
                    decoratorData: data,
                })
                break;
            case 'add':
                this.props.changed('addDecorator', data);
                break;
            case 'remove':
                this.props.changed('removeDecorator', data);
                break;
        }
        this.setState({
            text: this.props.data ? JSON.stringify(this.props.data.properties.btNode, null, 2) : '',
        });
    }

    onDecoratorChanged = (action, data) => {
        this.props.changed(action, data);
    }

    onRunPanelChanged = (action, data) => {
        // this.props.changed(action, data);
    }

    onRunPanelMouseEvent = (action, data) => {
        console.log(`onRunPanelMouseEvent`, action, data);
        // this.props.changed(action, data);
    }

    render() {
        return (
            <div className={'NodePropertiesEditor'}>
                <textarea name="text" value={this.state.text} rows={20}
                    onChange={this.onChange}
                    onBlur={this.onNodeChanged}
                />
                <Decorators
                    node={this.state.data}
                    appModel={this.props.appModel}
                    onMouseEvent={this.onDecoratorMouseEvent}
                />
                <DecoratorPropertiesEditor data={this.state.decoratorData} appModel={this.props.appModel} changed={this.onDecoratorChanged} />
                <RunPanel data={{}} appModel={this.props.appModel} changed={this.onRunPanelChanged} onMouseEvent={this.onRunPanelMouseEvent} />
            </div>
        )
    }
}