const graphData = {
  "nodes": [
    {
      "id": "0",
      "group": 1,
      "properties": {
        "name": "Andrew"
      },
      "labels": [
        "LoopMember"
      ],
      "position": {
        "x": 800.4474932236285,
        "y": 222.60540428109775
      }
    },
    {
      "id": "1",
      "group": 1,
      "properties": {
        "name": "Estella"
      },
      "labels": [
        "LoopMember"
      ],
      "position": {
        "x": 323.6574123552059,
        "y": 539.5455661768367
      }
    },
    {
      "id": "2",
      "group": 1,
      "properties": {
        "name": "Finlay"
      },
      "labels": [
        "LoopMember"
      ],
      "position": {
        "x": 323.580322265625,
        "y": 211.362060546875
      }
    },
    {
      "id": "3",
      "group": 1,
      "properties": {
        "name": "Alexis"
      },
      "labels": [
        "LoopMember"
      ],
      "position": {
        "x": 912,
        "y": 484
      }
    },
    {
      "id": "4",
      "group": 1,
      "properties": {
        "name": "sodium"
      },
      "labels": [
        "Jibo"
      ],
      "position": {
        "x": -197.8467140197754,
        "y": 536.3764953613281
      }
    },
    {
      "id": "5",
      "group": 1,
      "properties": {
        "name": "loopRelationships",
        "id": "001"
      },
      "labels": [
        "Quest"
      ],
      "position": {
        "x": 121.68312644958496,
        "y": 120.05018615722656
      }
    },
    {
      "id": "6",
      "group": 1,
      "properties": {
        "name": "tellAJoke",
        "id": "000"
      },
      "labels": [
        "Quest"
      ],
      "position": {
        "x": -91.36740112304688,
        "y": 306.60191345214844
      }
    },
    {
      "id": "7",
      "group": 1,
      "properties": {},
      "labels": [
        ""
      ],
      "position": {
        "x": 506.21078759934653,
        "y": 656.1441379541805
      }
    }
  ],
  "links": [
    {
      "source": "1",
      "target": "0",
      "value": 1,
      "id": "0",
      "type": "RELATIONSHIP",
      "startNode": "1",
      "endNode": "0",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "2",
      "target": "0",
      "value": 1,
      "id": "1",
      "type": "RELATIONSHIP",
      "startNode": "2",
      "endNode": "0",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "0",
      "target": "3",
      "value": 1,
      "id": "2",
      "type": "RELATIONSHIP",
      "startNode": "0",
      "endNode": "3",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "3",
      "target": "1",
      "value": 1,
      "id": "3",
      "type": "RELATIONSHIP",
      "startNode": "3",
      "endNode": "1",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "2",
      "target": "1",
      "value": 1,
      "id": "4",
      "type": "RELATIONSHIP",
      "startNode": "2",
      "endNode": "1",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "2",
      "target": "3",
      "value": 1,
      "id": "5",
      "type": "RELATIONSHIP",
      "startNode": "2",
      "endNode": "3",
      "properties": {
        "state": "unknown",
        "quest": "001"
      },
      "linknum": 1
    },
    {
      "source": "4",
      "target": "6",
      "value": 1,
      "id": "6",
      "type": "QUEST",
      "startNode": "4",
      "endNode": "6",
      "properties": {
        "jibo": "sodium",
        "state": "completed"
      },
      "linknum": 1
    },
    {
      "source": "6",
      "target": "5",
      "value": 1,
      "id": "7",
      "type": "QUEST",
      "startNode": "6",
      "endNode": "5",
      "properties": {
        "jibo": "global",
        "unlockedBy": "000"
      },
      "linknum": 1
    },
    {
      "source": "4",
      "target": "6",
      "value": 1,
      "id": "8",
      "type": "QUEST",
      "startNode": "4",
      "endNode": "6",
      "properties": {
        "jibo": "global",
        "unlockedBy": "000"
      },
      "linknum": 1
    },
    {
      "source": "1",
      "target": "7",
      "value": 1,
      "id": "9",
      "startNode": "1",
      "endNode": "7",
      "properties": {},
      "linknum": 1
    }
  ]
}

export default graphData
