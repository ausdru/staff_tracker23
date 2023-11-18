const db = require('../config/connection');

function viewDepts() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, departments) => {
            if (err) {
                reject(err);
            } else {
                resolve(departments);
            }
        });
    });
};

function addDept(departmentName) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { viewDepts, addDept };
