'use strict';
module.exports = function (blackboard, notepad, result, emitter) {
    return {
        '3': {
            'id': '3',
            'name': 'Parallel',
            'asset-pack': 'core',
            'class': 'Parallel',
            'children': [
                19,
                16
            ],
            'decorators': [],
            'options': { 'succeedOnOne': false }
        },
        '16': {
            'id': '16',
            'name': 'Sequence [Repeat]',
            'parent': 3,
            'asset-pack': 'core',
            'class': 'Sequence',
            'children': [
                26,
                18
            ],
            'decorators': [23],
            'options': {}
        },
        '18': function () {
            return {
                'id': '18',
                'name': 'Pause for a bit',
                'parent': 16,
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'getTime': () => {
                        return 1000 + 2000 * Math.random();
                    }
                }
            };
        },
        '19': {
            'id': '19',
            'name': 'Sequence [Repeat]',
            'parent': 3,
            'asset-pack': 'core',
            'class': 'Sequence',
            'children': [
                21,
                25
            ],
            'decorators': [22],
            'options': {}
        },
        '21': function () {
            return {
                'id': '21',
                'name': 'Pause for a bit',
                'parent': 19,
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'options': {
                    'getTime': () => {
                        return 2000 + 2500 * Math.random();
                    }
                }
            };
        },
        '22': function () {
            return {
                'id': '22',
                'name': 'While true',
                'asset-pack': 'core',
                'class': 'WhileCondition',
                'options': {
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    }
                }
            };
        },
        '23': function () {
            return {
                'id': '23',
                'name': 'While true',
                'asset-pack': 'core',
                'class': 'WhileCondition',
                'options': {
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    }
                }
            };
        },
        '25': function () {
            return {
                'id': '25',
                'name': 'Blink',
                'parent': 19,
                'asset-pack': 'core',
                'class': 'ExecuteScript',
                'options': {
                    'exec': () => {
                        blackboard.blinks = blackboard.blinks || 1;
                        console.log('BLINK!!!@', blackboard.blinks);
                        blackboard.blinks += 1;
                        console.log(blackboard);
                    }
                }
            };
        },
        '26': function () {
            return {
                'id': '26',
                'name': 'Look-at',
                'parent': 16,
                'asset-pack': 'core',
                'class': 'ExecuteScript',
                'children': [],
                'options': {
                    'exec': () => {
                        console.log('LOOK-AT');
                    }
                }
            };
        },
        'meta': { 'version': 1 }
    };
};