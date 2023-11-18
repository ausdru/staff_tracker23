const db = require('../config/connection');

function viewRoles() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT role.id, role.title, role.salary, department.department_name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
      `;
      db.query(query, (err, roles) => {
        if (err) {
          reject(err);
        } else {
          resolve(roles);
        }
      });
    });
  };


  function addRole(title, salary, departmentId) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      db.query(query, [title, salary, departmentId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
  
  function rolesFromDb() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT id, title FROM role';
      db.query(query, (err, roles) => {
        if (err) {
          reject(err);
        } else {
          resolve(roles);
        }
      });
    });
  };
  
  
  module.exports = { viewRoles, addRole, rolesFromDb };