const expect = require('unexpected');
const test = require('ava').serial;

const process = require('./fixtures/process');
const handlers = require('./handlers');

const execute = (key) => {
    const step = process.steps[key];
    const handler = handlers[step.id];
    const result = handler(state, step.in);
    expect(result, 'to satisfy', step.expect);
};

let state = {};

test('1. Create Order', () => {
    execute('order.create');
});