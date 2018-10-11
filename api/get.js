'use strict';

//var worker = require('../controller/worker.js');

var obj = {};

module.exports = obj;

obj.getTeachers = async function (req, res) {
    let start = req.query.start;
    let end = req.query.end;
    res.json({
        message: 'Data: '+start+' '+end
    });
};
