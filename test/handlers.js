const handlers = {
    "order.created": function(state, event){
        return Object.assign({}, {id: 1}, event);
    }
};


module.exports = handlers;