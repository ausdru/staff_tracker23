// Dependencies:
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const fs = require('fs');

const { viewDepts, addDept } = require('./scripts/departments');
const { viewRoles, addRole } = require('./scripts/roles');
const { viewEmployees, addEmployee, employeesFromDb } = require('./scripts/employees');

const mysql = require('mysql2');
dotenv.config();

// inquirer prompt
function userMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'input',
                message: 'Please select an option:',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add New Department',
                    'Add New Role',
                    'Add New Employee',
                    'Update Current Employee Role',
                    'Exit'
                ],
            },
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View All Departments':
                    viewDepts()
                        .then((departments) => {
                            console.table(departments);
                            userMenu();
                        })
                        .catch((err) => {
                            console.error('Error:', err);
                            userMenu();
                        });
                break;
                case 'Add New Department':
                    addDept()
                        .then((departments) => {
                            const deptOptions = departments.map((department) => ({
                                name: department.name,
                                value: department.id,
                        }));

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'title',
                                    message: 'Please enter title of role.'
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'Please enter salary amount for role.'
                                },
                            ])
                            .then((answers) => {
                                addRole(answers.title, answers.salary, answers.departmentId)
                                    .then(() => {
                                        console.log('Role was added successfully.')
                                        userMenu();
                                    })
                                    .catch((err) => {
                                        console.error('Error:', err);
                                        userMenu();
                                    });
                                });
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                userMenu();
                            });
                    break;

                case 'View All Roles':
                viewRoles()
                    .then((roles) => {
                        console.table(roles);
                        userMenu();
                    })
                    .catch((err) => {
                        console.error('Error:', err);
                        userMenu();
                    });
                break;
                case 'Add A Role':
                    viewDepts()
                        .then((departments) => {
                            const deptOptions = departments.map((department) => ({
                                name: department.name,
                                value: department.id,
                        }));

                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'title',
                                    message: 'Please enter title of role.'
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'Please enter salary amount for role.'
                                },
                            ])
                            .then((answers) => {
                                addRole(answers.title, answers.salary, answers.departmentId)
                                    .then(() => {
                                        console.log('Role was added successfully.')
                                        userMenu();
                                    })
                                    .catch((err) => {
                                        console.error('Error:', err);
                                        userMenu();
                                    });
                                });
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                userMenu();
                            });
                    break;
                    case 'View All Employees':
                        viewEmployees()
                            .then((employees) => {
                                console.table(employees);
                                userMenu();
                            })
                            .catch((err) => {
                                console.error('Error:', err)
                                userMenu();
                            });
                    break;
                    case 'Add New Employee':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'first_name',
                                message: 'Please enter employee\'s first name.'
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: 'Please enter employee\'s last name.'
                            },
                            {
                                type: 'input',
                                name: 'role_id',
                                message: 'Please enter employee\'s role ID.'
                            },
                            {
                                type: 'input',
                                name: 'manager_id',
                                message: 'Please enter employee\'s manager\'s ID.'
                            }
                        ])
                        .then((employeeDetails) => {
                            addEmployee(
                                employeeDetails.first_name,
                                employeeDetails.last_name,
                                employeeDetails.role_id,
                                employeeDetails.manager_id
                            )
                            .then(() => {
                                console.log('Employee was added successfully.')
                                userMenu();
                            })
                            .catch((err) => {
                                console.error('Error:', err);
                                userMenu();
                            });
                        });
                    break;
                    case 'Update Current Employee Role':
                        employeesFromDb()
                            .then((employees) => {
                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            name: 'employeeId',
                                            message: 'Please choose the employee of role you wish to update.',
                                            choices: employees.map((employee) => ({
                                                name: `${employee.first_name} ${employee.last_name}`,
                                                value: employee.id,
                                            })),

                                        },
                                        {
                                            type: 'list',
                                            name: 'newRoleId',
                                            message: 'Please choose new role for employee.',
                                            choices: roles.map((role) => ({
                                                name: role.title,
                                                value: role.id
                                            }))

                                        },
                                    ])
                                    .then((updateDetails) => {
                                        updateEmployeeRole(updateDetails.employeeId, updateDetails.newRoleId)
                                            .then(() => {
                                                console.log('Employee\'s role updated successfully.');
                                                userMenu();
                                            })
                                            .catch((err) => {
                                                console.error('Error updating employee\'s role.', err);
                                                userMenu();
                                            });
                                    });
                            })
                            .catch((err) => {
                                console.error('Error getting employees!', err);
                                userMenu();
                            });
                        break;
                        case 'Exit':
                            console.log('Exiting application now.');
                            process.exit(0);
                        break;
                        }
            })
}

userMenu();