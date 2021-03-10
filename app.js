const inquirer = require('inquirer');
const mysql = require('mysql');

function greeting() {
    console.log(
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
            console.log(
                `${answers.option}`, '\n', '\n',
                'Goodbye!', '\n',
            );
        })};

        mainMenu();

// console.log('Hello World');
// console.log(
//     '!!!Employee Manager ascii art!!!', '\n', '\n',
//     '--------------------------', '\n', '\n',
//     'What would you like to do?', '\n',
//     '1 View All Employees', '\n',
//     '2 View All Employees By Department', '\n',
//     '3 View All Employees By Manager', '\n',
//     '4 Add Employee', '\n',
//     '5 Remove Employee', '\n',
//     '6 Update Employee Role', '\n',
//     '7 Update Employee Manager', '\n',
//     '8 View All Roles', '\n',
//     '9 Add Role', '\n',
//     '10 Remove Role', '\n',
//     '11 View All Departments', '\n',
//     '12 Add Department', '\n',
//     '13 Remove Department', '\n',
//     '14 Quit', '\n', '\n',
//     'If 1: console.table', '\n',
//     'If 2: Which department would you like to see employees for?',
//     'Engineering, Finance, Legal, Sales', '\n',
//     'If Engineering: console.table', '\n',
//     'If 7: Which employee do you want to see direct reports for?', '\n',
//     'John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupik, Kunal Singh, Malia Brown, Sarah Laurd, Tom Allen,', '\n',
//     'If 4: What is the employee"s first name?', '\n',
//     'If 4: What is the employee"s last name?', '\n',
//     'If 4: What is the employee"s role?', '\n',
//     'The Roles: Sales Lead, Salesperson, Lead Engineer, Software Engineer, Account Manager, Accountant, Legal Team Lead, Lawyer', '\n',
//     'If 4: Who is the employee"s manager?', '\n',
//     'The Managers: John Doe, Mike Chan, Ashley Rodriguez, Kevin Tupic, Kunal Singh, Malia Brown, Sarah Lourd, Tom Allen, None', '\n',
//     'After filling out, if 1: then new employee will show', '\n',
//     'If 5: Which employee do you want to remove?', '\n',
//     'If 6: Which employee"s role do you want to update?', '\n',
//     'If 6: Which role do you want to assign the selected employee?', '\n',
//     'If 7: Which employee"s manager do you want to update?', '\n',
//     'Which employee do you want to set as manager for the selected employee? - can be null/none','\n',
//     'If 8: console.table id/title/department/salary','\n',
//     'If 9: What is the name of the role?', '\n',
//     'This is custom input from the user','\n',
//     'If 9: What is the salary of the role?', '\n',
//     'Which department does the role belong to?', '\n',
//     'The departments: Engineering, Finance, Legal, Sales', '\n',
//     'New role would then show up when creating a new Employee','\n',
//     'If 14: console.log"Goodbye!"'
// );

/*
1 Sales Lead Sales 100000
2 Salesperson Sales 80000
3 Lead Engineer Engineering 150000
4 Software Engineer Engineering 120000
5 Account Manager Finance 160000
6 Accountant Finance 125000
7 Legal Team Lead Legal 250000
8 Lawyer Legal 190000
*/

/*
Titles are in Departments:
Sales Lead = in Sales
Salesperson = Sales
Lead Engineer = Engineering
Software Engineer = Engineering
Account Manager = Finance
Accountant = Finance
Legal Team Lead = Legal
Lawyer = Legal
*/

/*
columns for View All Employees: id, first_name, last_name, title, department, salary, manager

salaries: 80000, 190000, 25000, 125000, 160000, 120000, 150000, 100000
*/