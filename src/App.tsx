import * as React from "react";
import "./App.css";
import D3Container from './components/D3Container/D3Container';
import BehaviorTreeContainer from './components/BehaviorTreeContainer/BehaviorTreeContainer';
import NodePropertiesEditor from "./components/NodePropertiesEditor/NodePropertiesEditor";
import Model from './model/Model';

let ipcRenderer;
if (process.env.REACT_APP_MODE === 'electron') {
  // Add the ipcRenderer to receive messages from the Main
  ipcRenderer = require('electron').ipcRenderer;
  console.log(`App: running in electron mode.`, ipcRenderer);
}
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

    if (ipcRenderer) {
      console.log(`App: setting up ipcRenderer listeners.`);
      ipcRenderer.on('onSetProjectRoot', (event: any, data: any) => {
        console.log(`App: onSetProjectRoot:`, data);
        // const projectRoot: string = data.directory;
        // console.log(`App: new root: ${projectRoot}`);
        // runtime.registerProjectPath(projectRoot);
        // this.state.flowModel.projectRoot = projectRoot;

        // // interaction-flow-engine: set project root
        // Runtime.instance.setRoot(projectRoot);

        // this.setState({
        //   projectRoot: projectRoot,
        // });
      });

      ipcRenderer.on('onNewGraph', (event: any, data: any) => {
        // { filePath: { canceled: false, filePath: '' } }
        console.log(`App: onNewGraph:`, data);
        if (!data.filePath.canceled) {
          this.props.appModel.data.init(data.filePath.filePath);
          this.props.appModel.data.saveToFile();
          this.setState({
            graphData: this.props.appModel.data.nodesAndLinks,
            selectedNodeData: undefined,
          });
        }
      });

      ipcRenderer.on('onOpenGraph', (event: any, data: any) => {
        console.log(`App: onOpenGraph:`, data);
        const filePath = data.files.filePaths[0];
        // 'onOpenGraph', { files: { canceled: false, filePaths: [''] } }
        console.log(`App: onOpenGraph: filePath`, filePath);
        if (!data.files.canceled) {
          this.props.appModel.loadBehaviorTreeData(filePath);
          this.setState({
            graphData: this.props.appModel.data.nodesAndLinks,
            selectedNodeData: undefined,
          });
        }
      });

      ipcRenderer.on('onSaveGraph', (event: any, data: any) => {
        console.log(`App: onSaveGraph:`, data);
        // { filePath: '' }
        this.props.appModel.data.saveToFile();
      });

      ipcRenderer.on('onSaveAsGraph', (event: any, data: any) => {
        console.log(`App: onSaveAsGraph:`, data);
        // { filePath: { canceled: false, filePath: '' } }
        if (!data.filePath.canceled) {
          this.props.appModel.data.saveToFile(data.filePath.filePath);
        }
      });
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