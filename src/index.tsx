import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Model from './model/Model';

console.log(`process.env: `, process.env);
if (process.env.REACT_APP_MODE === 'electron') {
    console.log(`Running in Electron: Filesystem access is enabled.`)
}

const appModel = new Model();

ReactDOM.render(
  <React.StrictMode>
    <App appModel={appModel}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
