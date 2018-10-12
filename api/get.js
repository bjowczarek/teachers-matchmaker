'use strict';

var worker = require('../controller/worker.js');

var obj = {};

module.exports = obj;

obj.getTeachers = async function (req, res) {
    console.log("Received message: " + req)
    let day = req.query.day;
    let start = req.query.start;
    let end = req.query.end;
    let groupType = req.query.group;
    if (day && start && end && groupType){
        console.log("Query values are: %s %s %s %s", day, start, end, groupType)
        try {
            console.log("Calling method...")
            let response = await worker.getTeachers(day.toString(), start, end, groupType)
            console.log("Response is %s", response)
            res.json({
                code: 1,
                message: 'Teachers are: ' + response
            });
        } catch (error) {
            res.status(500).json({
                code: -1,
                message: 'Internal server error: ' + error
            });
        }
        
    }
    else{
        res.status(400).json({
            code: -1,
            message: "Wrong query format! ex. ?day=wtorek&start=10&end=12&group=\"przedszkole\""
        });
    }
    
};
