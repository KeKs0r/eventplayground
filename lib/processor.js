const { compose, series } = require('async');
const patrun = require('patrun');
const { noop, find, map } =require('lodash');
/*
 Process
 1. Command Validation
 2. Load Dependency
 3. Dependency Validation
 4. Load Aggregate
 5. Pre Handler Validation
 6. Handler
 7. Post Handler Validation
 */

// const validation = Symbol('validation');
// const dependency = Symbol('dependency');
// const dependencyValidation = Symbol('dependencyValidation');
// const aggregate = Symbol('aggregate');
// const preHandler = Symbol('preHandler');
// const handler = Symbol('handler');
// const postHandler = Symbol('postHandler');
//
// const lifecycle = {
//     validation,
//     dependency,
//     dependencyValidation,
//     aggregate,
//     preHandler,
//     handler,
//     postHandler
// };


class Processor {
    constructor() {
        this._mainHandlers = patrun();
        // Middleware
        this._middlewareTypes = {};
        this._middleware = {};

        this.handle = this.handle.bind(this);
        this.registerMiddleware = this.registerMiddleware.bind(this);
        this.registerMiddlewareType = this.registerMiddlewareType.bind(this);
        this._composeMiddleware = this._composeMiddleware.bind(this);
        this._checkType = this._checkType.bind(this);
    }

    handle(cmd, cb) {
        cb = (!cb) ? noop : cb;
        const handler = this._mainHandlers.find(cmd);
        if (!handler) {
            return cb();
        }



        const chain = Async.seq([
            (cb) => {

            },
            (res, cb)
        ]);

        chain(cmd, cb);

        preHandler = _(this._middlewareTypes)
            .filter((type) => {
                return !type.position || type.position
            })
            .sort('position')
            .map((type) => {
                const middlewares = this._middleware[type.id];

            });

        return handler(cmd, cb);
        /*
         return cb();
         const validation = this._composeMiddleware(lifecycle.validation);
         validation(cmd, cb);
         */
    }

    registerCommandHandler(pattern, handler) {
        this._mainHandlers.add(pattern, handler);
    }

    registerMiddlewareType(type) {
        const { id, position } = type;
        if (!id) {
            throw new Error('Id for MiddlewareType not provided');
        }
        if (this._middlewareTypes[id]) {
            throw new Error(`${id} already defined`);
        }
        const existingPosition = find(this._middlewareTypes, { position });
        if (existingPosition) {
            throw new Error(`${existingPosition.id} is already registered on position ${position}`);
        }
        this._middlewareTypes[id] = type;
    }

    registerMiddleware(type, middleware) {
        this._checkType(type);
        if (!this._middleware[type]) {
            this._middleware[type] = [];
        }
        this._middleware[type].push(middleware);
    }

    _checkType(type) {
        if (!this._middlewareTypes[type]) {
            throw new Error(`${type} Middleware Type not defined`);
        }
    }

    _composeMiddleware(type) {
        this._checkType(type);
        const middlewares = this._middleware[type];
        if (!middlewares) {
            return compose();
        }
        return compose(...middlewares);
    }

}


module.exports = Processor;
