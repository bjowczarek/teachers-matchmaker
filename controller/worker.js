'use strict';
var fw = require('./file-worker.js');
var obj = {};
module.exports = obj;

obj.getTeachers = function(day, start, end, groupType){
    return new Promise((resolve, reject) => {
        let response = [];
        try {
            let obj = fw.readTeachersFile();
            obj.teachers.forEach(teacher => {
                let includes = teacher.groups.includes(groupType);
                if (!includes)
                    return;
                let fits = verifyIfInAvRange(teacher, day, start, end)
                console.log(fits)
                if (fits)
                    response.push(teacher.name)
            });
            resolve(response)
        } catch (error) {
            reject("Unexpected error: " + error)
        }
    });
}

obj.uploadTeachers = async function (json){
    await fw.writeTeachersFile(json);
}

function verifyIfInAvRange(teacher, day, start, end){
    let teacherDay = teacher.availability[day];
    if (teacherDay.start > start)
        return false;
    if (teacherDay.end < end)
        return false;
    return true;
}