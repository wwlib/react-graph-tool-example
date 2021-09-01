'use strict';
module.exports = function (blackboard, notepad, result, emitter) {
    return {
        '5c663278-10f2-4257-ae2b-27c85bb1a80b': {
            'id': '5c663278-10f2-4257-ae2b-27c85bb1a80b',
            'name': 'Root',
            'class': 'Sequence',
            'children': [
                'a21b7208-c19d-4db6-87df-f2a3e6a36087',
                'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368'
            ],
            'decorators': [],
            'options': {
                'name': 'Root',
                'id': '5c663278-10f2-4257-ae2b-27c85bb1a80b',
                'layout': {
                    'x': 410,
                    'y': 70
                }
            }
        },
        'a21b7208-c19d-4db6-87df-f2a3e6a36087': function () {
            return {
                'id': 'a21b7208-c19d-4db6-87df-f2a3e6a36087',
                'name': 'Init',
                'parent': '5c663278-10f2-4257-ae2b-27c85bb1a80b',
                'class': 'ExecuteScript',
                'decorators': [],
                'options': {
                    'name': 'Init',
                    'exec': () => {
                        notepad.vCooldownTime = 100;
                        notepad.hCooldownTime = 100;
                        notepad.tCooldownTime = 500;
                        console.log('Init.', blackboard, notepad, result);
                    },
                    'id': 'a21b7208-c19d-4db6-87df-f2a3e6a36087',
                    'layout': {
                        'x': 318,
                        'y': 218
                    }
                }
            };
        },
        'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368': {
            'id': 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
            'name': 'Flight',
            'parent': '5c663278-10f2-4257-ae2b-27c85bb1a80b',
            'class': 'Parallel',
            'children': [
                'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
                'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
                'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1'
            ],
            'decorators': ['1eb4d866-2672-4806-9b8d-d0e34ccd0833'],
            'options': {
                'name': 'Flight',
                'succeedOnOne': false,
                'id': 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
                'layout': {
                    'x': 510,
                    'y': 219
                }
            }
        },
        'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c': {
            'id': 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
            'name': 'Vertical',
            'parent': 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
            'class': 'Sequence',
            'children': [
                '99d8fe74-b456-4ef0-9054-cfc9c88e3be3',
                'ac0168f1-a455-4377-8d79-ef42b45e02cc',
                '4dbd2b2a-21ee-47d6-93c6-3b457e8d5337'
            ],
            'decorators': [],
            'options': {
                'name': 'Vertical',
                'id': 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
                'layout': {
                    'x': 312,
                    'y': 384
                }
            }
        },
        '99d8fe74-b456-4ef0-9054-cfc9c88e3be3': function () {
            return {
                'id': '99d8fe74-b456-4ef0-9054-cfc9c88e3be3',
                'name': 'VCooldown',
                'parent': 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
                'class': 'TimeoutJs',
                'decorators': [],
                'options': {
                    'name': 'VCooldown',
                    'getTime': () => notepad.vCooldownTime,
                    'id': '99d8fe74-b456-4ef0-9054-cfc9c88e3be3',
                    'layout': {
                        'x': 88,
                        'y': 549
                    }
                }
            };
        },
        'ac0168f1-a455-4377-8d79-ef42b45e02cc': function () {
            return {
                'id': 'ac0168f1-a455-4377-8d79-ef42b45e02cc',
                'name': 'VThrustOn',
                'parent': 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
                'class': 'ExecuteScript',
                'decorators': ['7d9c2ef7-cbbe-423c-b6a8-b329ec48db20'],
                'options': {
                    'name': 'VThrustOn',
                    'exec': () => {
                        blackboard.keys.ArrowUp = 'down';
                    },
                    'id': 'ac0168f1-a455-4377-8d79-ef42b45e02cc',
                    'layout': {
                        'x': 254,
                        'y': 551
                    }
                }
            };
        },
        '4dbd2b2a-21ee-47d6-93c6-3b457e8d5337': function () {
            return {
                'id': '4dbd2b2a-21ee-47d6-93c6-3b457e8d5337',
                'name': 'VThrustOff',
                'parent': 'ff0bfe70-05f2-4d39-966a-e6bc07b2f16c',
                'class': 'ExecuteScript',
                'decorators': [],
                'options': {
                    'name': 'VThrustOff',
                    'exec': () => {
                        blackboard.keys.ArrowUp = 'up';
                    },
                    'id': '4dbd2b2a-21ee-47d6-93c6-3b457e8d5337',
                    'layout': {
                        'x': 421,
                        'y': 551
                    }
                }
            };
        },
        'db6ebc20-f277-4f62-8ea5-5bf7340ac756': {
            'id': 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
            'name': 'Horizontal',
            'parent': 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
            'class': 'Sequence',
            'children': [
                '6927b270-3494-4808-816a-f20a8f8ee11a',
                'a006cc01-a249-47b4-a9a9-51554b66ec07',
                '1f813ac3-f2e5-4ed7-a13c-8a58206340dd'
            ],
            'decorators': [],
            'options': {
                'name': 'Horizontal',
                'id': 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
                'layout': {
                    'x': 523,
                    'y': 410
                }
            }
        },
        '6927b270-3494-4808-816a-f20a8f8ee11a': function () {
            return {
                'id': '6927b270-3494-4808-816a-f20a8f8ee11a',
                'name': 'HCooldown',
                'parent': 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
                'class': 'TimeoutJs',
                'decorators': [],
                'options': {
                    'name': 'HCooldown',
                    'getTime': () => notepad.hCooldownTime,
                    'id': '6927b270-3494-4808-816a-f20a8f8ee11a',
                    'layout': {
                        'x': 606,
                        'y': 702
                    }
                }
            };
        },
        'a006cc01-a249-47b4-a9a9-51554b66ec07': function () {
            return {
                'id': 'a006cc01-a249-47b4-a9a9-51554b66ec07',
                'name': 'HThrustOn',
                'parent': 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
                'class': 'ExecuteScript',
                'decorators': ['36da6b7c-3de9-4e81-af59-e932ed7d4cbd'],
                'options': {
                    'name': 'HThrustOn',
                    'exec': () => {
                        const shipL = blackboard.controller.shipCoords.x;
                        const shipR = blackboard.controller.shipCoords.x + 40;
                        const padL = blackboard.controller.landingPadRect.x;
                        const padR = blackboard.controller.landingPadRect.x + blackboard.controller.landingPadRect.width;
                        if (shipL < padL) {
                            blackboard.keys.ArrowRight = 'down';
                        } else if (shipR > padR) {
                            blackboard.keys.ArrowLeft = 'down';
                        }
                    },
                    'id': 'a006cc01-a249-47b4-a9a9-51554b66ec07',
                    'layout': {
                        'x': 770,
                        'y': 700
                    }
                }
            };
        },
        '1f813ac3-f2e5-4ed7-a13c-8a58206340dd': function () {
            return {
                'id': '1f813ac3-f2e5-4ed7-a13c-8a58206340dd',
                'name': 'HThrustOff',
                'parent': 'db6ebc20-f277-4f62-8ea5-5bf7340ac756',
                'class': 'ExecuteScript',
                'decorators': [],
                'options': {
                    'name': 'HThrustOff',
                    'exec': () => {
                        blackboard.keys.ArrowLeft = 'up';
                        blackboard.keys.ArrowRight = 'up';
                    },
                    'id': '1f813ac3-f2e5-4ed7-a13c-8a58206340dd',
                    'layout': {
                        'x': 939,
                        'y': 698
                    }
                }
            };
        },
        'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1': {
            'id': 'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1',
            'name': 'Target',
            'parent': 'd3b2ccc1-bd6f-450b-a8fe-d62b5de8a368',
            'asset-pack': 'core',
            'class': 'Sequence',
            'children': [
                'eea4549b-461b-4adb-9ec2-1d449cfc08d5',
                '5e7005b5-b1f0-4a2a-ba6c-2f95cf8808be'
            ],
            'decorators': [],
            'options': {
                'name': 'Target',
                'id': 'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1',
                'layout': {
                    'x': 830,
                    'y': 322
                }
            }
        },
        'eea4549b-461b-4adb-9ec2-1d449cfc08d5': function () {
            return {
                'id': 'eea4549b-461b-4adb-9ec2-1d449cfc08d5',
                'name': 'TCooldown',
                'parent': 'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1',
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'name': 'TCooldown',
                    'getTime': () => notepad.tCooldownTime,
                    'id': 'eea4549b-461b-4adb-9ec2-1d449cfc08d5',
                    'layout': {
                        'x': 733,
                        'y': 463
                    }
                }
            };
        },
        '5e7005b5-b1f0-4a2a-ba6c-2f95cf8808be': function () {
            return {
                'id': '5e7005b5-b1f0-4a2a-ba6c-2f95cf8808be',
                'name': 'AdjustTarget',
                'parent': 'c37510fd-3f7b-49b8-8d3b-c2d39b78aad1',
                'asset-pack': 'core',
                'class': 'ExecuteScript',
                'children': [],
                'decorators': [],
                'options': {
                    'name': 'AdjustTarget',
                    'id': '5e7005b5-b1f0-4a2a-ba6c-2f95cf8808be',
                    'layout': {
                        'x': 912,
                        'y': 463
                    },
                    'exec': () => {
                        blackboard.keys.ArrowUp = 'up';
                    }
                }
            };
        },
        '1eb4d866-2672-4806-9b8d-d0e34ccd0833': function () {
            return {
                'id': '1eb4d866-2672-4806-9b8d-d0e34ccd0833',
                'name': 'FlightLoop',
                'class': 'WhileCondition',
                'options': {
                    'name': 'FlightLoop',
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    },
                    'id': '1eb4d866-2672-4806-9b8d-d0e34ccd0833'
                }
            };
        },
        '7d9c2ef7-cbbe-423c-b6a8-b329ec48db20': function () {
            return {
                'id': '7d9c2ef7-cbbe-423c-b6a8-b329ec48db20',
                'name': 'VThrustHold',
                'class': 'WhileCondition',
                'options': {
                    'name': 'VThrustHold',
                    'init': () => {
                    },
                    'conditional': () => {
                        let hold = false;
                        if (blackboard.controller.shipVelocity.y < -3) {
                            console.log(`velocity too high: ${ blackboard.controller.shipVelocity.y } holding.`);
                            hold = true;
                        }
                        return hold;
                    },
                    'id': '7d9c2ef7-cbbe-423c-b6a8-b329ec48db20'
                }
            };
        },
        '36da6b7c-3de9-4e81-af59-e932ed7d4cbd': function () {
            return {
                'id': '36da6b7c-3de9-4e81-af59-e932ed7d4cbd',
                'name': 'HThrustHold',
                'class': 'WhileCondition',
                'options': {
                    'name': 'HThrustHold',
                    'init': () => {
                        notepad.HThrustStart = Date.now();
                    },
                    'conditional': () => {
                        let hold = false;
                        const elapsed = Date.now() - notepad.HThrustStart;
                        if (elapsed < 50) {
                            hold = true;
                        }
                        return hold;
                    },
                    'id': '36da6b7c-3de9-4e81-af59-e932ed7d4cbd'
                }
            };
        },
        'meta': { 'version': 1 }
    };
};