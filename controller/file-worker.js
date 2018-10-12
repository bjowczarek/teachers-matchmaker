'use strict';
var fs = require('fs');
var path = require('path')

var obj = {};

module.exports = obj;

obj.readTeachersFile = function (){
    let teachers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/teachers.json'), 'utf8'));
    return teachers;
}

obj.readConfigFile = function () {
    let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config/config.json'), 'utf8'));
    return config;
}

obj.writeTeachersFile = async function (jsonObj) {
    let str = JSON.stringify(jsonObj);
    let status = await writeFileAsPromise(str, path.resolve(__dirname, "../config/teachers.json"))
    return status;
}

obj.writeGroupsToFile = async function (jsonObj) {
    let config = obj.readConfigFile();
    config.groupTypes = jsonObj
    let str = JSON.stringify(config);
    let status = await writeFileAsPromise(str, path.resolve(__dirname, "../config/config.json"))
    return status;
}

function writeFileAsPromise(str, file) {
    return new Promise((resolve, reject) => {
                fs.writeFile(file, str, 'utf8', function (err) {
                    if (err){
                        console.log("Error saving data: %s", JSON.stringify(err));
                        reject("Error saving data: %s", JSON.stringify(err));
                    } 
                    else {
                        resolve("Success");
                    }
                });
            });
}





