const btData = {
    "3": {
        "id": 3,
        "class": "Parallel",
        "name": "",
        "asset-pack": "core",
        "children": [
            19,
            16
        ],
        "decorators": [],
        "options": {
            "succeedOnOne": false
        },
        "position": {
            "x": 511,
            "y": 153
        }
    },
    "16": {
        "id": 16,
        "class": "Sequence",
        "name": "[Repeat]",
        "asset-pack": "core",
        "parent": 3,
        "children": [
            26,
            18
        ],
        "decorators": [
            23
        ],
        "options": {},
        "position": {
            "x": 654,
            "y": 320
        }
    },
    "18": {
        "id": 18,
        "class": "TimeoutJs",
        "asset-pack": "core",
        "parent": 16,
        "children": [],
        "name": "Pause for a bit",
        "options": {
            "getTime": [
                "() => {",
                "   return 1000 + 2000 * Math.random();",
                "}"
            ]
        },
        "position": {
            "x": 759,
            "y": 476
        },
        "decorators": []
    },
    "19": {
        "id": 19,
        "class": "Sequence",
        "name": "[Repeat]",
        "asset-pack": "core",
        "parent": 3,
        "children": [
            21,
            25
        ],
        "decorators": [
            22
        ],
        "options": {},
        "position": {
            "x": 369,
            "y": 328
        }
    },
    "21": {
        "id": 21,
        "class": "TimeoutJs",
        "name": "Pause for a bit",
        "asset-pack": "core",
        "parent": 19,
        "options": {
            "getTime": [
                "() => {",
                "   return 2000 + 2500 * Math.random();",
                "}"
            ]
        },
        "position": {
            "x": 261,
            "y": 478
        },
        "children": []
    },
    "22": {
        "id": 22,
        "class": "WhileCondition",
        "name": "While true",
        "asset-pack": "core",
        "options": {
            "init": [
                "() => {",
                "}"
            ],
            "conditional": [
                "() => {",
                "  return true;",
                "}"
            ]
        }
    },
    "23": {
        "id": 23,
        "class": "WhileCondition",
        "name": "While true",
        "asset-pack": "core",
        "options": {
            "init": [
                "() => {",
                "}"
            ],
            "conditional": [
                "() => {",
                "  return true;",
                "}"
            ]
        }
    },
    "25": {
        "id": 25,
        "class": "ExecuteScript",
        "name": "Blink",
        "options": {
            "exec": [
                "() => {",
                "    blackboard.blinks = blackboard.blinks || 1;",
                "    console.log('BLINK!', blackboard.blinks);",
                "    blackboard.blinks += 1;",
                "    console.log(blackboard);",
                "}"
            ]
        },
        "asset-pack": "core",
        "parent": 19,
        "position": {
            "x": 425,
            "y": 476
        }
    },
    "26": {
        "id": 26,
        "class": "ExecuteScript",
        "name": "Look-at",
        "options": {
            "exec": [
                "() => {",
                "    console.log('LOOK-AT');",
                "}"
            ]
        },
        "asset-pack": "core",
        "parent": 16,
        "children": [],
        "position": {
            "x": 593,
            "y": 477
        }
    },
    "meta": {
        "version": 1
    }
}

export default btData
