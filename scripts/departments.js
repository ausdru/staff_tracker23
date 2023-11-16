const connection = require('../config/connection');

function viewDepts() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM department', (err, departments) => {
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
        connection.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { viewDepts, addDept };