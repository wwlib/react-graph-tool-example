'use strict';
module.exports = function (blackboard, notepad, result, emitter) {
    return {
        '825539ba-7bf7-439a-8f2b-65fb5b9afd37': {
            'id': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
            'name': 'Try All',
            'asset-pack': 'core',
            'class': 'Sequence',
            'children': [
                'a6174b63-4086-4994-a203-f45ab6a674a2',
                'c0548a44-14d2-4b8f-b202-f17e5426d483',
                '8a9da9b1-b027-4e5a-8a3a-982283471659',
                '35499afe-5e48-4015-97dd-c3b0475f44af',
                '1e77e97b-3203-4d08-94ea-a0dfc402be8d'
            ],
            'decorators': [],
            'options': {}
        },
        'a6174b63-4086-4994-a203-f45ab6a674a2': function () {
            return {
                'id': 'a6174b63-4086-4994-a203-f45ab6a674a2',
                'name': 'Wait',
                'parent': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'getTime': () => {
                        return 1000;
                    }
                }
            };
        },
        'c0548a44-14d2-4b8f-b202-f17e5426d483': function () {
            return {
                'id': 'c0548a44-14d2-4b8f-b202-f17e5426d483',
                'name': 'Wait',
                'parent': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'getTime': () => {
                        return 1000;
                    }
                }
            };
        },
        '8a9da9b1-b027-4e5a-8a3a-982283471659': function () {
            return {
                'id': '8a9da9b1-b027-4e5a-8a3a-982283471659',
                'name': 'Wait',
                'parent': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
                'asset-pack': 'core',
                'class': 'TimeoutJs',
                'children': [],
                'decorators': [],
                'options': {
                    'getTime': () => {
                        return 1000;
                    }
                }
            };
        },
        '35499afe-5e48-4015-97dd-c3b0475f44af': function () {
            return {
                'id': '35499afe-5e48-4015-97dd-c3b0475f44af',
                'name': 'Set Result',
                'parent': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
                'asset-pack': 'core',
                'class': 'ExecuteScript',
                'children': [],
                'decorators': [],
                'options': {
                    'exec': () => {
                        result.done = true;
                    }
                }
            };
        },
        '1e77e97b-3203-4d08-94ea-a0dfc402be8d': {
            'id': '1e77e97b-3203-4d08-94ea-a0dfc402be8d',
            'name': 'Block',
            'parent': '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
            'asset-pack': 'core',
            'class': 'Null',
            'children': [],
            'decorators': [],
            'options': {}
        },
        '1fbb6c3d-f4e0-4aba-a842-d8d848aac8ec': function () {
            return {
                'id': '1fbb6c3d-f4e0-4aba-a842-d8d848aac8ec',
                'name': '1fb: undefined',
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
        'meta': { 'version': 1 }
    };
};