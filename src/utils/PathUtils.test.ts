import PathUtils from './PathUtils';

const path = require('path');

it('findRoot() returns a non-empty string', () => {
    const root: string = PathUtils.findRoot();
    // console.log(`findRoot(): root: ${root}`);
    expect(root).toBeTruthy;
});
