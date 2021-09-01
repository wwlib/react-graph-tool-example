'use strict';
module.exports = function (blackboard, notepad, result, emitter) {
    return {
        'e770be1d-76a0-484d-b726-4ee3b82d9386': {
            'id': 'e770be1d-76a0-484d-b726-4ee3b82d9386',
            'name': 'Root',
            'class': 'Parallel',
            'children': [
                'c5f36b0e-be7e-4157-9e9d-358aef0060e1',
                'a502a4ae-ca86-4216-9e4c-b7c8deef638f',
                '6e4b3f96-e578-4603-800b-7a7009e35bba'
            ],
            'decorators': ['008c46b6-72ce-4b4f-85de-85ff4c08ce38'],
            'options': {
                'name': 'Root',
                'succeedOnOne': false,
                'id': 'e770be1d-76a0-484d-b726-4ee3b82d9386',
                'layout': {
                    'x': 529,
                    'y': 144
                }
            }
        },
        'c5f36b0e-be7e-4157-9e9d-358aef0060e1': {
            'id': 'c5f36b0e-be7e-4157-9e9d-358aef0060e1',
            'name': 'Branch1',
            'parent': 'e770be1d-76a0-484d-b726-4ee3b82d9386',
            'class': 'Sequence',
            'children': ['99e06d3f-c3e0-4c6c-bab9-9e6c2d69d11a'],
            'decorators': ['3b2687bd-86a6-4fed-96d1-48c996b64115'],
            'options': {
                'name': 'Branch1',
                'id': 'c5f36b0e-be7e-4157-9e9d-358aef0060e1',
                'layout': {
                    'x': 297,
                    'y': 370
                }
            }
        },
        'a502a4ae-ca86-4216-9e4c-b7c8deef638f': {
            'id': 'a502a4ae-ca86-4216-9e4c-b7c8deef638f',
            'name': 'Branch2',
            'parent': 'e770be1d-76a0-484d-b726-4ee3b82d9386',
            'class': 'Sequence',
            'children': [],
            'decorators': ['045c991d-d044-40c1-af06-36d8b546a03f'],
            'options': {
                'name': 'Branch2',
                'id': 'a502a4ae-ca86-4216-9e4c-b7c8deef638f',
                'layout': {
                    'x': 569,
                    'y': 311
                }
            }
        },
        '6e4b3f96-e578-4603-800b-7a7009e35bba': {
            'id': '6e4b3f96-e578-4603-800b-7a7009e35bba',
            'name': 'Branch3',
            'parent': 'e770be1d-76a0-484d-b726-4ee3b82d9386',
            'class': 'Sequence',
            'children': [],
            'decorators': ['22c3476d-f6dd-4be4-863b-9490eb6c07d5'],
            'options': {
                'name': 'Branch3',
                'id': '6e4b3f96-e578-4603-800b-7a7009e35bba',
                'layout': {
                    'x': 756,
                    'y': 365
                }
            }
        },
        '99e06d3f-c3e0-4c6c-bab9-9e6c2d69d11a': function () {
            return {
                'id': '99e06d3f-c3e0-4c6c-bab9-9e6c2d69d11a',
                'name': 'cooldown',
                'parent': 'c5f36b0e-be7e-4157-9e9d-358aef0060e1',
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'name': 'cooldown',
                    'id': '99e06d3f-c3e0-4c6c-bab9-9e6c2d69d11a',
                    'layout': {
                        'x': 298,
                        'y': 616
                    },
                    'getTime': () => {
                        console.log('GET_TIME');
                        return 6000;
                    }
                }
            };
        },
        '008c46b6-72ce-4b4f-85de-85ff4c08ce38': function () {
            return {
                'id': '008c46b6-72ce-4b4f-85de-85ff4c08ce38',
                'name': 'Loop',
                'class': 'WhileCondition',
                'options': {
                    'name': 'Loop',
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    },
                    'id': '008c46b6-72ce-4b4f-85de-85ff4c08ce38'
                }
            };
        },
        '3b2687bd-86a6-4fed-96d1-48c996b64115': function () {
            return {
                'id': '3b2687bd-86a6-4fed-96d1-48c996b64115',
                'name': 'Loop1',
                'asset-pack': 'core',
                'class': 'WhileCondition',
                'options': {
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    },
                    'name': 'Loop1',
                    'id': '3b2687bd-86a6-4fed-96d1-48c996b64115'
                }
            };
        },
        '045c991d-d044-40c1-af06-36d8b546a03f': function () {
            return {
                'id': '045c991d-d044-40c1-af06-36d8b546a03f',
                'name': 'Loop2',
                'asset-pack': 'core',
                'class': 'WhileCondition',
                'options': {
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    },
                    'name': 'Loop2',
                    'id': '045c991d-d044-40c1-af06-36d8b546a03f'
                }
            };
        },
        '22c3476d-f6dd-4be4-863b-9490eb6c07d5': function () {
            return {
                'id': '22c3476d-f6dd-4be4-863b-9490eb6c07d5',
                'name': 'Loop3',
                'asset-pack': 'core',
                'class': 'WhileCondition',
                'options': {
                    'init': () => {
                    },
                    'conditional': () => {
                        return true;
                    },
                    'name': 'Loop3',
                    'id': '22c3476d-f6dd-4be4-863b-9490eb6c07d5'
                }
            };
        },
        'meta': { 'version': 1 }
    };
};