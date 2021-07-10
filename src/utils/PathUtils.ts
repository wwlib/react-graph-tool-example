import path from 'path';
const findRootModule: any = require('find-root'); // npm package

let electronApp: any;
if (process.env.REACT_APP_MODE === 'electron') {
    electronApp = require('electron').remote.app;
}

class PathUtils {

    static findRoot(): string {
        let result: string = '';
        if (electronApp) {
            result = electronApp.getAppPath();
        } else {
            result = findRootModule();
        }
        return result;
    }

    static resolvePath(uri: string): string {
        return path.join(PathUtils.findRoot(), uri);
    }
}

export default PathUtils;