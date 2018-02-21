const {compose, series} = require('async');

const validation = [
    (res, cb) => {
      console.log(res)
      cb(null,res);
    }
];

const input = (cb) => {
   cb(null, 'input')
};

