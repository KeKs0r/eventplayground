const { ACTIONS } = require('../../src/constants');

const process = {
    [ACTIONS.ORDER.CREATE_ORDER]: {
        type: ACTIONS.ORDER.CREATE_ORDER,
        customer: 15,
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
        ],
    },
    [ACTIONS.ORDER.CONFIRM_ORDER]: target => ({
        type: ACTIONS.ORDER.CONFIRM_ORDER,
        target,
    }),
    [ACTIONS.INVOICE.PAY_INVOICE]: target => ({
        type: ACTIONS.INVOICE.PAY_INVOICE,
        amount: 226.93,
        target,
    }),
};

module.exports = process;