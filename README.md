# react-graph-tool-example

A react graph tool example (starting point).

Tested with node versions: v14.15.0, v14.17.2

### TODO
- replace mouse movment code with d3 events so d3-zoom will work
- ?? construct the svg "scene"" with d3 rather than using react components
    - using react components works - good experiment - but rather stay in d3 world?
    - but it is nice to be able to manage HTML/react components as in the behavior tree example

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn build:electron`

Builds an electron version of the app

### `yarn start:electron`

Runs the app in electron

### `yarn dist`

Packages a distributable electron app
- output: ./dist