import * as React from "react";
import "./App.css";
import D3Container from './components/D3Container/D3Container';
// import { AnimatedCircles } from './components/D3Container/AnimatedCircles';
import Model from './model/Model';

export interface AppProps {
  appModel: Model;
}

export interface AppState {
  graphData: any;
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
      graphData: this.props.appModel.data,
    }
  }

  componentWillMount() {
    this.props.appModel.addListener('tick', this.onTick);
  }

  componentWillUnmount() {
    this.props.appModel.removeListener('tick', this.onTick);
  }

  onTick = () => {
    // console.log(`App: tick`);
    this.setState({
      graphData: this.props.appModel.data,
    });
  }

  // 

  render() {
    return (
      <div className="App">
        <D3Container width={this.props.appModel.svgWidth} height={this.props.appModel.svgHeight} appModel={this.props.appModel} graphData={this.state.graphData} />
        {/* <AnimatedCircles /> */}
      </div>
    );
  }
}