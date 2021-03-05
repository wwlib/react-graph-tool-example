import * as React from "react";
import "./App.css";
import D3Container from './components/D3Container/D3Container';
// import { AnimatedCircles } from './components/D3Container/AnimatedCircles';
import Model from './model/Model';

export interface AppProps {
  appModel: Model;
}

export interface AppState {
}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <D3Container width={1024} height={1024} appModel={this.props.appModel}/>
        {/* <AnimatedCircles /> */}
      </div>
    );
  }
}