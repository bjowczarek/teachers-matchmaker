'use strict';

//var worker = require('../controller/worker.js');

var obj = {};

module.exports = obj;

obj.uploadNewSet = async function (req, res) {
    var body = req.body;
    if (!body || Object.keys(body).length === 0) {
        res.status(422).json({
            code: -1,
            message: "JSON body required!"
        });
    } else {
        try {
            res.status(200).json({
                code: 0,
                message: body
            });
        } catch (error) {
            res.status(500).json({
                code: 1,
                message: "Failed to import data."
            });
        }


    };

};
