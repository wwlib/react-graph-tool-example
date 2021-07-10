import BehaviorTreeData from './BehaviorTreeData';

const path = require('path');

it('load() returns data', () => {
    const btData = new BehaviorTreeData();
    btData.load(path.resolve(__dirname, './idle-example.bt.json'));
    // console.log(btData);
    console.log(btData.rootNode);
    console.log(btData.nodes.length);
    console.log(btData.links);
    expect(btData).toBeTruthy;
});
