const inquirer = require('inquirer');
const mysql = require('mysql');

let query = 
`SELECT e.id, e.first_name, e.last_name, r.title, d.name department, r.salary, 
Concat(m.first_name, ' ', m.last_name) manager
from employee e 
inner join role r on e.role_id = r.id
inner join department d on r.department_id = d.id 
left join employee m on m.id = e.manager_id`

// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'root',
    database: 'employees_db',
  });

function greeting() {
    console.log(
        '\n',
        '----------', '\n',
        'Employee Manager', '\n',
        '----------', '\n',
    )
}
greeting();

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
        console.log(answers);
        switch (answers.option) {
            case "View All Employees":
                // I want to console log a table of all employees
                // console.table, probably going to join tables
                viewAllEmployees();
                break;
            case "View All Employees By Department":
                // Select * from employees where department='';
                // console.table employees by department
                getByDepartment();
                break;
            case "View All Employees By Manager":
                // Select * from employees where manager='';
                // console.table employees by manager
                getByManager();
                break;
            case "Add Employee":
                // Create row with employee information
                // first and last name, role, manager
                // should be able to see employee if view all employees is selected
                addEmployee();
                break;
            case "Remove Employee":
                // query to delete employee where
                removeEmployee();
                break;
            case "Update Employee Role":
                // select employee from db where name='' and update role to ${var}.
                updateEmployeeRole();
                break;
            case "Update Employee Manager":
                // first select employee, then change manager column to='';
                updateEmployeeManager();
                break;
            case "View All Roles":
                //  console.table id/title/department/salary','\n',
                viewAllRoles();
                break;
            case "Add Role":
                // new roleshould show up when creating new employee
                addRole();
                break;
            case "Remove Role":
                // query to delete role where
                removeRole();
                break;
            case "View All Departments":
                // I want to console log a table of all departments
                // console.table, probably going to join tables
                viewAllDepartments();
                break;
            case "Add Department":
                // Create row with department information
                // name
                // should be able to see department if view all departments is selected
                addDepartment();
                break;
            case "Remove Department":
                // query to delete department where
                removeDepartment();
                break;
            case "Quit":
                console.log("Goodbye!");
                connection.end();
                process.exit();
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
                    'Accountant Manager',
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
                    'Kunal Singh',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'None'
                ]
            }
        ]).then((answers) => {
            console.log(answers.firstName);
            console.log(answers.lastName);
            console.log(answers.role);
            console.log(answers.manager);

            // calls table until user quits
            mainMenu()
        }).catch(err => console.log(err));
}

function viewAllEmployees() {
    // let query = 
    // `SELECT e.id, e.first_name, e.last_name, r.title, d.name department, r.salary, m.manager_id manager
    // from employee e inner join role r on e.role_id = r.id
    // inner join department d on r.department_id = d.id left join employee m on m.manager_id = e.id`

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
            // console.logs table of employees by manager

            // calls table until user quits
            mainMenu()
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
                'Tammer Galal'
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
                'Accountant Manager',
                'Accountant',
                'Legal Team Lead',
                'Lawyer'
            ]
        },
    ]).then((answers) => {
        console.log(answers.updateEmployeeRole1);
        console.log(answers.updateEmployeeRole2);
        // console.logs table of employees by department

        // calls table until user quits
        mainMenu()
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
                    'Tammer Galal'
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
                    'Kevin Tupik',
                    'Malia Brown',
                    'Sarah Lourd',
                    'Tom Allen',
                    'Tammer Galal'
                ]
            }
        ]).then((answers) => {
            console.log(answers.updateEmployeeManager1);
            console.log(answers.updateEmployeeManager2);
            // console.logs table of employees by department

            // calls table until user quits
            mainMenu()
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
                'Tammer Galal'
            ]
        }
    ]).then((answers) => {
        console.log(answers.removeEmployee + ' has successfully been removed.');

        // calls table until user quits
        mainMenu()
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
                name: "newRoleName",
                message: "What is the name of the role?"
            },
            {
                type: "input",
                name: "newRoleSalary",
                message: "What is the salary of the role?"
            },
            {
                type: "input",
                name: "newRoleDepartment",
                message: "Which department does the role belong to?",
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((answers) => {
            console.log(answers.newRoleName);
            console.log(answers.newRoleSalary);
            console.log(answers.newRoleDepartment);

            // calls table until user quits
            mainMenu()
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
                'Lawyer'
            ]
        }
    ]).then((answers) => {
        console.log(answers.removeRole + ' has successfully been removed.');

        // calls table until user quits
        mainMenu()
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
            // console.log(answers.departmentName);

// ==================================================
            connection.query(
                'INSERT INTO department SET ?',
                // QUESTION: What does the || 0 do?
                {
                name: answers.departmentName
                },
                (err) => {
                    if (err) {
                        console.log('Error: ', err)
                    } else {
                        console.log('Your department was created successfully!');
                        // re-prompt the user for if they want to bid or post
                        mainMenu()

                    }
                }
            );

// ==================================================

            // calls table until user quits
            mainMenu()
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
                choices: [
                    'Engineering',
                    'Finance',
                    'Legal',
                    'Sales'
                ]
            }
        ]).then((answers) => {
            console.log(answers.removeDepartment + ' has successfully been removed.');

            // calls table until user quits
            mainMenu()
        }).catch(err => console.log(err));
}
