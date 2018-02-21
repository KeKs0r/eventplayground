//const process = require('./fixtures/process');
const expect = require('unexpected');

const process = {
    initialState: {},
    steps: [
        {
            id: 'order.created',
            in: {
                event: 'order.create',
                customer: 3,
                product: 4
            },
            expect: {
                id: expect.it('to be ok'),
                customer: expect.it('to equal', 3),
                product: expect.it('to have length', 1)
                    .and('to have an item satisfying', 'to equal', 4)
            }
        },
        {
            id: 'order.product_changed',
            in: {
                event: 'order.product_changed',
                product: 10
            },
            expect: {
                id: expect.it('to be ok'),
                product: expect.it('to have length', 1)
                    .and('to have an item satisfying', 'to equal', 10)
            }
        },
        {
            id: 'order.customer_changed',
            in: {
                event: 'order.customer_changed',
                customer: 8
            },
            expect: {
                id: expect.it('to be ok'),
                customer: expect.it('to equal', 8),
            }
        },
        {
            id: 'order.item_added',
            in: {
                event: 'order.item_added',
                product: 12
            },
            expect: {
                id: expect.it('to be ok'),
                product: expect.it('to have length', 2)
                    .and('to have an item satisfying', 'to equal', 12)
            }
        },
        {
            id: 'order.item_removed',
            in: {
                event: 'order.item_removed',
                product: 10
            },
            expect: {
                id: expect.it('to be ok'),
                product: expect.it('to have length', 1)
                    .and('not to contain', 10)
            }
        },
    ]
};

/* Mock Solutions */


const orderCreated = function (state, event) {
    const { product, customer } = event;
    return Object.assign({}, { id: 1 }, {
        product: [product],
        customer
    });
};

const changeProduct = function (state, event) {
    const { product } = event;
    return Object.assign({}, state, {
        product: [product]
    })
};

const changeCustomer = function (state, event) {
    const { customer } = event;
    return Object.assign({}, state, {
        customer
    })
};

const addItem = (state, event) => {
    const { product } = event;
    return Object.assign({}, state, {
        product: [
            ...state.product,
            product
        ]
    })
};

const removeItem = (state, event) => {
    const { product } = state;
    const index = product.indexOf(event.product);
    return Object.assign({}, state, {
        product: product.slice(0, index).concat(product.slice(index + 1))
    })
};


const handlers = {
    "order.created": orderCreated
};


/* Process */
const first = orderCreated(process.initialState, process.steps[0].in);
/*?*/
expect(first, 'to satisfy', process.steps[0].expect);

const second = changeProduct(first, process.steps[1].in);
/*?*/
expect(second, 'to satisfy', process.steps[1].expect);

const third = changeCustomer(second, process.steps[2].in);
/*?*/
expect(third, 'to satisfy', process.steps[2].expect);

const forth = addItem(third, process.steps[3].in);
/*?*/
expect(forth, 'to satisfy', process.steps[3].expect);

const fifth = removeItem(forth, process.steps[4].in);
/*?*/
expect(fifth, 'to satisfy', process.steps[4].expect);


