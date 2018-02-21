const expect = require('unexpected');

const process = {
    initialState: {},
    steps: [
        {
            id: 'order.create',
            in: {
                cmd: 'order.create',
                customer: 3,
                product: 4
            },
            expect: {
                id: expect.it('to be ok'),
                customer: expect.it('to equal', 3),
                product: expect.it('to equal', 4)
            }
        }
    ]
};


module.exports = process;

