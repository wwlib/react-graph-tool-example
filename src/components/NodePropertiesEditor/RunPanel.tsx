import { Component } from 'react';
import './NodePropertiesEditor.css';
import Model from '../../model/Model';
import BehaviorTreeData from '../../model/BehaviorTreeData'

export interface RunPanelProps {
    data: any;
    appModel: Model;
    changed: any;
    onMouseEvent: any;
}

export interface RunPanelState {
    data: any;
}

export default class RunPanel extends Component<RunPanelProps, RunPanelState> {

    constructor(props: RunPanelProps) {
        super(props);
        let firstDecorator = {};
        this.state = {
            data: this.props.data,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: RunPanelProps) {
        if (nextProps.data !== this.props.data) {
            // console.log(`RunPanel: UNSAFE_componentWillReceiveProps: new data:`, nextProps.data);
            this.setState({
                data: nextProps.data,
            }, () => {

            });
        }
    }

    onMouseDown = (action: string, data?: any) => {
        switch (action) {
            case 'run':
                this.props.onMouseEvent('run', data);
                break;
            case 'cancelRun':
                this.props.onMouseEvent('cancelRun', data);
                break;
        }
    }

    render() {
        return (
            <div className={'RunPanel'}>
                <button className="RunPanelButton" onMouseDown={() => this.onMouseDown('run')}>Run</button>
                <button className="RunPanelButton" onMouseDown={() => this.onMouseDown('cancelRun')}>Cancel</button>
            </div>
        )
    }
}