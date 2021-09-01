// generated from bt (json) file

getBtRoot = function (blackboard: any, notepad: any, result: any) {
    const Sequ_825539ba = new BehaviorClasses.Sequence({
        name: 'Try All',
        id: '825539ba-7bf7-439a-8f2b-65fb5b9afd37',
        layout: { "x": 467, "y": 139 },
    });

    const Time_a6174b63 = new BehaviorClasses.TimeoutJs({
        getTime: () => {
            return 1000;
        },
        name: 'Wait',
        id: 'a6174b63-4086-4994-a203-f45ab6a674a2',
        layout: { "x": 120, "y": 465 },
    });

    const Time_c0548a44 = new BehaviorClasses.TimeoutJs({
        getTime: () => {
            return 1000;
        },
        name: 'Wait',
        id: 'c0548a44-14d2-4b8f-b202-f17e5426d483',
        layout: { "x": 320, "y": 470 },
    });

    const Time_8a9da9b1 = new BehaviorClasses.TimeoutJs({
        getTime: () => {
            return 1000;
        },
        name: 'Wait',
        id: '8a9da9b1-b027-4e5a-8a3a-982283471659',
        layout: { "x": 517, "y": 470 },
    });

    const Exec_35499afe = new BehaviorClasses.ExecuteScript({
        exec: () => {
            result.done = true
        },
        name: 'Set Result',
        id: '35499afe-5e48-4015-97dd-c3b0475f44af',
        layout: { "x": 725, "y": 467 },
    });

    const Null_1e77e97b = new BehaviorClasses.Null({
        name: 'Block',
        id: '1e77e97b-3203-4d08-94ea-a0dfc402be8d',
        layout: { "x": 917, "y": 465 },
    });

    const Whil_1fbb6c3d = new DecoratorClasses.WhileCondition({
        init: () => {
        },
        conditional: () => {
            return true;
        },
        name: '1fb: undefined',
        id: '1fbb6c3d-f4e0-4aba-a842-d8d848aac8ec',
        layout: undefined,
    });

    Sequ_825539ba.children = [Time_a6174b63, Time_c0548a44, Time_8a9da9b1, Exec_35499afe, Null_1e77e97b];



    return Sequ_825539ba;

}
