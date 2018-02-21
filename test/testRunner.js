const process = require('./fixtures/process');


const testRunner = function(handlers, config) {
    const {test} = config;
    let state = process.initialState;

    process.steps.forEach((step, i) => {
        test('Step '+i+': '+step.id, function(){
            const handler = handlers[step.id];
            const result = handler(state, step.in);
            expect(result, 'to satisfy', step.expect);
            state = result;
        })
    });
};