// Test Stuff
const expect = require('unexpected').clone()
    .use(require('unexpected-sinon'));
const Sinon = require('sinon');
const { head } = require('lodash');

//To Test Stuff
const Processor = require('../Processor');


// Setup
const Api = new Processor();


// 1 Handler
// 1.1 Can Register Handler
Api.registerCommandHandler({ cmd: 'test' }, Sinon.spy(function (cmd, cb) {
    cb(null, { result: true });
}));
expect(Api.handle, 'not to throw');


//1.2 Empty Result if it wasn handled
expect((cb) => {
    Api.handle({ cmd: 'not_existing' }, cb);
}, 'to call the callback without error')
    .then((results) => {
        expect(results[0], 'not to be ok');
    });

// 1.3 Return Handled Result
expect((cb) => {
    Api.handle({ cmd: 'test' }, cb);
}, 'to call the callback without error')
    .then((args) => {
        const result = args[0];
        expect(result, 'to satisfy', {
            result: true
        });
    });


// 2. Middleware

// 2.1 Middleware Types
const demoType = 'validation';
const checkTypeValidation = () => {
    return Api._checkType(demoType)
};
expect(checkTypeValidation, 'to throw');
Api.registerMiddlewareType({ id: demoType });
expect(checkTypeValidation, 'not to throw');

// 2.2 Type: Id must be unique
expect(() => {
    Api.registerMiddlewareType({ id: demoType })
}, 'to throw', /already defined/);

// 2.3 Type: Position must be unique
Api.registerMiddlewareType({ id: 'first', position: -3 });
expect(() => {
    Api.registerMiddlewareType({ id: 'second', position: -3 });
}, 'to throw', /position/);


// 2.2 Middleware
// 2.2.1 Error Middleware can be registered
const ErrorMiddleware = ({ cmd }, cb) => {
    cb(new Error('Validation Error'));
};
Api.registerMiddleware(demoType, ErrorMiddleware);

// they test implementation :-(
const typeMiddlewares = Api._middleware[demoType];
expect(typeMiddlewares, 'to be ok');
expect(typeMiddlewares, 'to have length', 1);


// 2.2.2 Middleware is called

expect((cb) => {
    Api.handle({ cmd: 'test' }, (err, res) => {
        err;
        res;
        cb(err, res);
    })
}, 'to call the callback with error', /Validaation/);



