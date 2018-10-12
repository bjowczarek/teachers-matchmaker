'use strict';
var fw = require('./file-worker.js');
var obj = {};
module.exports = obj;

obj.getTeachers = function(day, start, end, groupType){
    return new Promise((resolve, reject) => {
        let response = [];
        try {
            let obj = fw.readTeachersFile();
            let cfg = fw.readConfigFile();
            obj.teachers.forEach(teacher => {
                //validate
                let validGroup = cfg.groupTypes.includes(groupType);
                if (!validGroup)
                    throw ("Invalid group type: " + groupType)
                let validDay = cfg.daysMapping.hasOwnProperty(day);
                if (!validDay)
                    throw ("Invalid day name: " + day)
                
                //logic
                let includes = teacher.groups.includes(groupType);
                if (!includes)
                    return;
                let fits = verifyIfInAvRange(teacher, cfg.daysMapping[day], start, end)
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
    let mapping = '{"poniedziałek": "0", "wtorek": "1", "środa": "2", "czwartek": "3", "piątek": "4", "sobota": "5", "niedziela": "6" }'

    let teacherDay = teacher.availability[day];
    if (teacherDay.start > start)
        return false;
    if (teacherDay.end < end)
        return false;
    return true;
}