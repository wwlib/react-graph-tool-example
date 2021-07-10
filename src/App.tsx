import * as React from "react";
import "./App.css";
import D3Container from './components/D3Container/D3Container';
import BehaviorTreeContainer from './components/BehaviorTreeContainer/BehaviorTreeContainer';
import NodePropertiesEditor from "./components/NodePropertiesEditor/NodePropertiesEditor";

// import { AnimatedCircles } from './components/D3Container/AnimatedCircles';
import Model from './model/Model';

export interface AppProps {
  appModel: Model;
}

export interface AppState {
  graphData: any;
  selectedNodeData: any;
}

export default class App extends React.Component<AppProps, AppState> {

  private _keyStatus: any;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      graphData: this.props.appModel.data.nodesAndLinks,
      selectedNodeData: undefined,
    }
  }

  componentWillMount() {
    this.props.appModel.addListener('tick', this.onTick);

    this._keyStatus = {
      Meta: 'up',
      Shift: 'up',
    }
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('focus', this.onFocus);

  }

  componentWillUnmount() {
    this.props.appModel.removeListener('tick', this.onTick);

    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('focus', this.onFocus);
  }

  onTick = () => {
    console.log(`App: tick`);
    this.setState({
      graphData: this.props.appModel.data.nodesAndLinks,
    });
  }

  onKeyDown = (e: KeyboardEvent) => {
    // console.log(e);
    const key: string = e.key;
    switch (key) {
      case 'Meta':
        this._keyStatus.Meta = 'down';
        break;
      case 'Shift':
        this._keyStatus.Shift = 'down';
        break;
    }
  }

  onKeyUp = (e: KeyboardEvent) => {
    const key: string = e.key;
    switch (key) {
      case 'Meta':
        this._keyStatus.Meta = 'up';
        break;
      case 'Shift':
        this._keyStatus.Shift = 'up';
        break;
    }
  }

  onFocus = () => {
    this._keyStatus.Meta = 'up';
    this._keyStatus.Shift = 'up';
  }

  behaviorTreeChanged(action: string, data: any) {
    // console.log(action, data);
    switch (action) {
      case 'nodeSelected':
        if (this._keyStatus.Meta === 'up') {
          this.setState({
            selectedNodeData: data,
          });
        } else if (this._keyStatus.Meta === 'down') {
          this.props.appModel.data.updateNode('removeNode', data);
          this.setState({
            selectedNodeData: undefined,
            graphData: this.props.appModel.data.nodesAndLinks,
          });
        }
        break;
    }
  }

  handleNodePropertiesChanged(action: string, data: any) {
    console.log(`handleNodePropertiesChanged:`, action, data);
    switch (action) {
      case 'addDecorator':
        this.props.appModel.data.updateNode('addDecorator', data);
        break;
      case 'removeDecorator':
        this.props.appModel.data.updateNode('removeDecorator', data);
        break;
      case 'updateNode':
        this.props.appModel.data.updateNode('updateNode', data);
        break;
      case 'updateDecorator':
        this.props.appModel.data.updateNode('updateDecorator', data);
        break;
    }
    this.setState({
      graphData: this.props.appModel.data.nodesAndLinks,
    });
  }

  render() {
    return (
      <div className="App">
        <BehaviorTreeContainer width={1024} height={1024} appModel={this.props.appModel} graphData={this.state.graphData}
          changed={(action: string, data: any) => this.behaviorTreeChanged(action, data)} />
        {/* <D3Container width={1024} height={1024} appModel={this.props.appModel} graphData={this.state.graphData}
          changed={(action: string, data: any) => console.log(action, data)} /> */}

        <NodePropertiesEditor
          data={this.state.selectedNodeData}
          appModel={this.props.appModel}
          changed={(action: string, data: any) => this.handleNodePropertiesChanged(action, data)} />
      </div>
    );
  }
}