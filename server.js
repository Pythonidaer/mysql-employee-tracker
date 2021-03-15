// import mysql connection variable to connect JavaScript to our database
const connection = require('./config/connection');
// import inquirer package so users can be prompted with objects and return promise results
const inquirer = require('inquirer');
// import console.table package to make what appears in the GUI a little bit prettier
const cTable = require('console.table');

// Utilize main query at the top for code re-usability
// This code joins tables and thus is used for any view/READ function
let query = 
`SELECT e.id, e.first_name, e.last_name, r.title, d.name department, r.salary, 
Concat(m.first_name, ' ', m.last_name) manager
from employee e 
inner join role r on e.role_id = r.id
inner join department d on r.department_id = d.id 
left join employee m on m.id = e.manager_id`

// ascii art because why not
var greeting = (function(){ /*
 _____                 _                       
| ____|_ __ ___  _ __ | | ___  _   _  ___  ___ 
|  _| | '_ ` _ \| '_ \| |/ _ \| | | |/ _ \/ _ \
| |___| | | | | | |_) | | (_) | |_| |  __/  __/
|_____|_| |_| |_| .__/|_|\___/ \__, |\___|\___|
                |_|            |___/           
 __  __                                   
|  \/  | __ _ _ __   __ _  __ _  ___ _ __ 
| |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|
| |  | | (_| | | | | (_| | (_| |  __/ |   
|_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|   
                          |___/             
*/}).toString().split('\n').slice(1, -1).join('\n');
console.log('\n', '\n', greeting, '\n', '\n',);

// Main Menu asks:
// Add employee, role, or department
// View employees (all, by dept or mngr), all roles, or all departments
// Update employee role or employee manager
// Remove employee, role, or department
function mainMenu() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'View All Roles',
                'Add Role',
                'Remove Role',
                'View All Departments',
                'Add Department',
                'Remove Department',
                'Quit'
            ]
        }
    ])
    .then((answers) => {
        switch (answers.option) {
            case "View All Employees": viewAllEmployees(); break;
            case "View All Employees By Department": getByDepartment(); break;
            case "View All Employees By Manager": getByManager(); break;
            case "Add Employee": addEmployee(); break;
            case "Remove Employee": removeEmployee(); break;
            case "Update Employee Role": updateEmployeeRole(); break;
            case "Update Employee Manager": updateEmployeeManager(); break;
            case "View All Roles": viewAllRoles(); break;
            case "Add Role": addRole(); break;
            case "Remove Role": removeRole(); break;
            case "View All Departments": viewAllDepartments(); break;
            case "Add Department": addDepartment(); break;
            case "Remove Department": removeDepartment(); break;
            case "Quit": console.log("Goodbye!"); connection.end(); process.exit();
            // break; -- unnecessary since above exits out of the node app
        }
    })
    .catch(err => console.log(err));
}
mainMenu()



// ===================================
// ======= EMP: C, R, U, U, D ========
// =================================== 

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: [
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Software Engineer',
                    'Account Manager',
                    'Accountant',
                    'Legal Team Lead',
                    'Lawyer'
                ]
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupic',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal',
                    'None'
                ]
            }
        ]).then((answers) => {
            // hard codes user response to possibly corresponding id NOT SCALABLE
                switch (answers.role) {
                    case 'Sales Lead':
                        answers.role = 4
                        break;
                    case 'Salesperson':
                        answers.role = 4
                        break;
                    case 'Lead Engineer':
                        answers.role = 1
                        break;
                    case 'Software Engineer':
                        answers.role = 1
                        break;        
                    case 'Accounta Manager':
                        answers.role = 2
                        break;
                    case 'Accountant':
                        answers.role = 2
                        break;
                    case 'Legal Team Lead':
                        answers.role = 3
                        break;
                    case 'Lawyer':
                        answers.role = 3
                        break;        
                }

                switch (answers.manager) {
                    case 'John Doe':
                        answers.manager = 1
                        break;
                    case 'Mike Chan':
                        answers.manager = 2
                        break;
                    case 'Ashley Rodriguez':
                        answers.manager = 3
                        break;
                    case 'Kevin Tupic':
                        answers.manager = 4
                        break;        
                    case 'Malia Brown':
                        answers.manager = 5
                        break;
                    case 'Sarah Lourd':
                        answers.manager = 6
                        break;
                    case 'Tom Allen':
                        answers.manager = 7
                        break;
                    case 'Tammer Galal':
                        answers.manager = 8
                        break;        
                    case 'None':
                        answers.manager = null
                        break;        
                }

                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('${answers.firstName}', '${answers.lastName}', ${answers.role}, ${answers.manager})`, (err) => {
                        if (err) {
                            console.log('Mayhem!! ', err)
                        } else {
                            console.log('\n');
                            console.log(`Employee ${answers.firstName} ${answers.lastName} was created successfully!`);
                            console.log('\n');
                            mainMenu()
                        }
                    })
        }).catch(err => console.log(err));
}

function viewAllEmployees() {
    connection.query(query, (err, results) => {
        if (err) {
            console.log('Mayhem!! ', err)
        } else {
            console.log('\n');
            console.table(results);
            console.log('\n');
            mainMenu()
        }
        })
}

function getByDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "getByDepartment",
                message: "Which department would you like to see employees for?",
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((answers) => {
            // depending on which which option the user selects, add that where statement to filter that department
            switch (answers.getByDepartment) {
                case "Engineering":
                    let queryE = query + ` where name='engineering'`;
                    connection.query(queryE, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "Finance":
                    let queryF = query + ` where name='finance'`;
                    connection.query(queryF, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "Legal":
                    let queryL = query + ` where name='legal'`;
                    connection.query(queryL, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "Sales":
                    let queryS = query + ` where name='sales'`;
                    connection.query(queryS, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
            }
        }).catch(err => console.log(err));
}

function getByManager() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "getByManager",
                message: "Which employee manager would you like to search for?",
                choices: [
                    'Ashley Rodriguez',
                    'John Doe',
                    'Sara Lourd',
                    'Malia Brown'
                ]
            }
        ]).then((answers) => {
            console.log(answers.getByManager);
            switch (answers.getByManager) {
                case "Ashley Rodriguez":
                    let queryAR = query + ` where e.manager_id=3`;
                    connection.query(queryAR, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "John Doe":
                    let queryJD = query + ` where e.manager_id=1`;
                    connection.query(queryJD, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "Sara Lourd":
                    let querySL = query + ` where e.manager_id=6`;
                    connection.query(querySL, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
                case "Malia Brown":
                    let queryMB = query + ` where e.manager_id=5`;
                    connection.query(queryMB, (err, results) => {
                            if (err) {
                                console.log('Mayhem!! ', err)
                            } else {
                                console.log('\n');
                                console.table(results);
                                console.log('\n');
                                mainMenu()
                            }
                        })
                    break;
            }
        }).catch(err => console.log(err));
}

function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "updateEmployeeRole1",
            message: "Which employee do you want to update?",
            choices: [
                'John Doe',
                'Mike Chan',
                'Ashley Rodriguez',
                'Kevin Tupik',
                'Malia Brown',
                'Sarah Lourd',
                'Tom Allen',
                'Tammer Galal',
                'Gunner Nelson'
            ]
        },
        {
            type: "list",
            name: "updateEmployeeRole2",
            message: "Which role do you want to assign the selected employee?",
            choices: [
                'Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Account Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
            ]
        },
    ]).then((answers) => {
        let firstLast = answers.updateEmployeeRole1.split(" ")

        switch (answers.updateEmployeeRole2) {
            case 'Sales Lead':
                answers.updateEmployeeRole2 = 1
                break;
            case 'Salesperson':
                answers.updateEmployeeRole2 = 2
                break;
            case 'Lead Engineer':
                answers.updateEmployeeRole2 = 3
                break;
            case 'Software Engineer':
                answers.updateEmployeeRole2 = 4
                break;        
            case 'Accounta Manager':
                answers.updateEmployeeRole2 = 5
                break;
            case 'Accountant':
                answers.updateEmployeeRole2 = 6
                break;
            case 'Legal Team Lead':
                answers.updateEmployeeRole2 = 7
                break;
            case 'Lawyer':
                answers.updateEmployeeRole2 = 8
                break;        
        }

        connection.query(`UPDATE employee SET role_id = ${answers.updateEmployeeRole2} WHERE (first_name = "${firstLast[0]}" AND last_name = "${firstLast[1]}")`, (err) => {
            if (err) {
                console.log('Error: ', err)
            } else {
                console.log('Employee role was updated successfully!');
                mainMenu()
            }
        }
        );
    }).catch(err => console.log(err));
}

function updateEmployeeManager() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "updateEmployeeManager1",
                message:  "Which employee do you want to update the manager of?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupik',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal',
                    'Gunner Nelson'
                ]
            },
            {
                type: "list",
                name: "updateEmployeeManager2",
                message:  "Who do you want to update the manager to?",
                choices: [
                    'John Doe',
                    'Mike Chan',
                    'Ashley Rodriguez',
                    'Kevin Tupic',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal',
                    'Gunner Nelson',
                    'None'
                ]
            }
        ]).then((answers) => {
            // This will also lead to errors because the manager_id is not dynamic
            // aka when bootcamp installs this Gunner Nelson's id will not be 13, resulting in a manager of null.
            let firstLast = answers.updateEmployeeManager1.split(" ")

            switch (answers.updateEmployeeManager2) {
                case 'John Doe':
                    answers.updateEmployeeRole2 = 1
                    break;
                case 'Mike Chan':
                    answers.updateEmployeeRole2 = 2
                    break;
                case 'Ashley Rodriguez':
                    answers.updateEmployeeRole2 = 3
                    break;
                case 'Kevin Tupic':
                    answers.updateEmployeeRole2 = 4
                    break;        
                case 'Malia Brown':
                    answers.updateEmployeeRole2 = 5
                    break;
                case 'Sarah Lourd':
                    answers.updateEmployeeRole2 = 6
                    break;
                case 'Tom Allen':
                    answers.updateEmployeeRole2 = 7
                    break;
                case 'Tammer Galal':
                    answers.updateEmployeeRole2 = 8
                    break;        
                case 'Gunner Nelson':
                    answers.updateEmployeeRole2 = 13
                    break;        
                case 'None':
                    answers.updateEmployeeRole2 = null
                    break;        
            }
    
            connection.query(`UPDATE employee SET manager_id = ${answers.updateEmployeeRole2} WHERE (first_name = "${firstLast[0]}" AND last_name = "${firstLast[1]}")`, (err) => {
                if (err) {
                    console.log('Error: ', err)
                } else {
                    console.log('Employee manager was updated successfully!');
                    mainMenu()
                }
            }
            );
        }).catch(err => console.log(err));
}

function removeEmployee() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "removeEmployee",
            message: "Which employee do you want to remove?",
            choices: [
                'John Doe',
                'Mike Chan',
                'Ashley Rodriguez',
                'Kevin Tupik',
                'Malia Brown',
                'Sarah Lourd',
                'Tom Allen',
                'Tammer Galal',
                'Gunner Nelson'
            ]
        }
    ]).then((answers) => {

        // an array of words like [ 'John', 'Doe' ]
       let firstLast = answers.removeEmployee.split(" ")
        switch (answers.removeEmployee) {
            case `${answers.removeEmployee}`:
                connection.query(`DELETE FROM employees_db.employee WHERE (first_name = '${firstLast[0]}' AND last_name = '${firstLast[1]}')`, (err) => {
                        if (err) {
                            console.log('Mayhem!! ', err)
                        } else {
                            console.log('\n');
                            console.log(answers.removeEmployee + ' has successfully been removed.');
                            console.log('\n');
                            mainMenu()
                        }
                    })
                break;
        }
    }).catch(err => console.log(err));
}

// ===================================
// ========== ROLE: C, R, D ==========
// ===================================

function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?"
            },
            {
                type: "list",
                name: "deptid",
                message: "Which department does the role belong to?",
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((answers) => {

            switch (answers.deptid) {
                case 'Engineering':
                    answers.deptid = 1
                    break;
                case 'Finance':
                    answers.deptid = 2
                    break;
                case 'Legal':
                    answers.deptid = 3
                    break;
                case 'Sales':
                    answers.deptid = 4
                    break;        
            }
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES ("${answers.title}", ${answers.salary}, ${answers.deptid})`, (err) => {
                if (err) {
                    console.log('Error: ', err)
                } else {
                    console.log('Your role was created successfully!');
                    mainMenu()
                }
            }
        );
        }).catch(err => console.log(err));
}

function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log('Mayhem!!: ', err)
        } else {

            console.log('\n');
            console.table(results);
            console.log('\n');
            mainMenu()
        }
    }
    );
}

function removeRole() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "removeRole",
            message: "Which role do you want to remove?",
            choices: [
                'Sales Lead',
                'Salesperson',
                'Lead Engineer',
                'Software Engineer',
                'Accountant Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer',
                'Marketing'
            ]
        }
    ]).then((answers) => {

        switch (answers.removeRole) {
            case `${answers.removeRole}`:
                connection.query(`DELETE FROM employees_db.role WHERE (title = '${answers.removeRole}')`, (err) => {
                        if (err) {
                            console.log('Mayhem!! ', err)
                        } else {
                            console.log('\n');
                            console.log(answers.removeRole + ' has successfully been removed.');
                            console.log('\n');
                            mainMenu()
                        }
                    })
                break;
        }
    }).catch(err => console.log(err));
}

// ===================================
// ========== DEPT: C, R, D ==========
// ===================================
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the department?"
            },
        ]).then((answers) => {
            connection.query(`INSERT INTO department (name) VALUES ("${answers.departmentName}")`, (err) => {
                    if (err) {
                        console.log('Error: ', err)
                    } else {
                        console.log('Your department was created successfully!');
                        mainMenu()
                    }
                }
            );
        }).catch(err => console.log(err));
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log('Mayhem!!: ', err)
        } else {

            console.log('\n');
            console.table(results);
            console.log('\n');
            mainMenu()
        }
    }
    );
}

function removeDepartment() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "removeDepartment",
                message: "Which role do you want to remove?",
                // This is not dynamic. Therefore, users will not be able to remove any other departments but this! :(
                // Future development: consider mapping an array, or storing a variable here attached to a function elsewhere
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales',
                    'Human Resources'
                ]
            }
        ]).then((answers) => {
       switch (answers.removeDepartment) {
           case `${answers.removeDepartment}`:
               connection.query(`DELETE FROM employees_db.department WHERE (name = '${answers.removeDepartment}')`, (err) => {
                       if (err) {
                           console.log('Mayhem!! ', err)
                       } else {
                           console.log('\n');
                           console.log(answers.removeDepartment + ' has successfully been removed.');
                           console.log('\n');
                           mainMenu()
                       }
                   })
               break;
       }
        }).catch(err => console.log(err));
}


// ===================================
// ========== !!! NOTES !!! ==========
// ===================================
/*
This code isn't scalable.
Some parts of it are.
Here are some of the major improvements I'd like to see in future versions:
     1. dynamicize arrays. use something like .map, because hard-coded leaves out names
     2. join tables / write better queries instead of hard-converting user responses to ids
          - the reason this is an issue = there is no guarantee what the id will be
     3. learn more about constructor functions and classes, which could have made this far mor DRY
     4. make this project DRY -- I'm sure other students completed this with 1/3 of the code
*/
