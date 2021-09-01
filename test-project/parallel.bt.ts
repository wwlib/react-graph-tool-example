// generated from bt (json) file

getBtRoot = function (blackboard: any, notepad: any, result: any) {
    const Para_e770be1d = new BehaviorClasses.Parallel({
        name: 'Root',
        succeedOnOne: false,
        id: 'e770be1d-76a0-484d-b726-4ee3b82d9386',
        layout: { "x": 529, "y": 144 },
    });

    const Sequ_c5f36b0e = new BehaviorClasses.Sequence({
        name: 'Branch1',
        id: 'c5f36b0e-be7e-4157-9e9d-358aef0060e1',
        layout: { "x": 297, "y": 370 },
    });

    const Sequ_a502a4ae = new BehaviorClasses.Sequence({
        name: 'Branch2',
        id: 'a502a4ae-ca86-4216-9e4c-b7c8deef638f',
        layout: { "x": 569, "y": 311 },
    });

    const Sequ_6e4b3f96 = new BehaviorClasses.Sequence({
        name: 'Branch3',
        id: '6e4b3f96-e578-4603-800b-7a7009e35bba',
        layout: { "x": 756, "y": 365 },
    });

    const Time_99e06d3f = new BehaviorClasses.TimeoutJs({
        name: 'cooldown',
        id: '99e06d3f-c3e0-4c6c-bab9-9e6c2d69d11a',
        layout: { "x": 298, "y": 616 },
        getTime: () => { console.log('GET_TIME'); return 6000; },
    });

    const Whil_008c46b6 = new DecoratorClasses.WhileCondition({
        name: 'Loop',
        init: () => {
        },
        conditional: () => {
            return true;
        },
        id: '008c46b6-72ce-4b4f-85de-85ff4c08ce38',
        layout: undefined,
    });

    const Whil_3b2687bd = new DecoratorClasses.WhileCondition({
        init: () => {
        },
        conditional: () => {
            return true;
        },
        name: 'Loop1',
        id: '3b2687bd-86a6-4fed-96d1-48c996b64115',
        layout: undefined,
    });

    const Whil_045c991d = new DecoratorClasses.WhileCondition({
        init: () => {
        },
        conditional: () => {
            return true;
        },
        name: 'Loop2',
        id: '045c991d-d044-40c1-af06-36d8b546a03f',
        layout: undefined,
    });

    const Whil_22c3476d = new DecoratorClasses.WhileCondition({
        init: () => {
        },
        conditional: () => {
            return true;
        },
        name: 'Loop3',
        id: '22c3476d-f6dd-4be4-863b-9490eb6c07d5',
        layout: undefined,
    });

    Para_e770be1d.children = [Sequ_c5f36b0e, Sequ_a502a4ae, Sequ_6e4b3f96];
    Sequ_c5f36b0e.children = [Time_99e06d3f];


    Para_e770be1d.decorators = [Whil_008c46b6];
    Sequ_c5f36b0e.decorators = [Whil_3b2687bd];
    Sequ_a502a4ae.decorators = [Whil_045c991d];
    Sequ_6e4b3f96.decorators = [Whil_22c3476d];

    return Para_e770be1d;

}
