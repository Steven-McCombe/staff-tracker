const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Require inquirer
const inquirer = require('inquirer');
//Require Console.Table --Cleaner table in console log removes index.
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: '127.0.0.1',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  },
    console.log(`Connected to the employees_db database.`),
);
// Start the inquirer prompt to see what the user wants to do next
const startPrompt = () => {
    
    inquirer.prompt([{
        type: 'list',
        name: 'doNext',
        message: 'What would you like to do?',
        choices: ['View all Employees','Add Employees', 'Update Employee Role', 'View All Roles', 'Add Role', 'View all Departments', 'Add Department', 'Update Employee Managers', 'View Employees by Manager', 'View Employees by Department', 'Delete Departments, Roles and Employees', 'View Department Budget', 'Quit']
    }])
        .then((data) => { 
            //Deconstruct the prompt data to get the users choice
            const { doNext } = data
            //Switch case to run functions based on users input
            switch (doNext) { 
                case 'View all Employees': { 
                    viewEmployees();
                    break
                }
                case 'Add Employees': { 
                    addEmployees();
                    break
                }
                case 'Update Employee Role': { 
                    updateEmployeeRole();
                    break
                }
                case 'View All Roles': { 
                    viewRoles();
                    break
                }
                case 'Add Role': {
                    addRole();
                    break
                 }
                case 'View all Departments': {
                    viewDepartment();
                    break
                }
                case 'Add Department': {
                    addDepartment();
                    break
                }
                case 'Update Employee Managers': {
                    updateEmployeeManager();
                    break
                }
                case 'View Employees by Manager': {
                    viewEmployeesByManager();
                    break
                }
                case 'View Employees by Department': { 
                    viewEmployeesByDepartment();
                    break
                }
                case 'Delete Departments, Roles and Employees': { 
                    deleteDepartmentRoleEmployee();
                    break
                }
                case 'View Department Budget': {
                    viewDepartmentBudget();
                    break
                }
                case 'Quit': {
                    Quit();
                    break
                }
                    
            }
        } )
}
// Run Inquirer Prompts
startPrompt();
//function to create a query to view employees
viewEmployees = () => { 
    const sql = `SELECT 
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary
  FROM employee employee
  INNER JOIN role role ON employee.role_id = role.id
  INNER JOIN department department ON role.department_id = department.id;`; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\nThere are Currently ${rows.length} Employees\n`)
        console.table(rows);
    })
        .catch(console.log)
}
//function to add employees to the employee table
addEmployees = () => { 

    //TODO add an inquirer prompt that will allow the user to input these fields and store it in an array. 

    let addEmployeeArray = ["'John'", "'Doe'", "NULL", "1",]
    
    const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id)
    VALUES (${addEmployeeArray[0]}, ${addEmployeeArray[1]}, ${addEmployeeArray[2]}, ${addEmployeeArray[3]});`; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\nEmployee information has been added to the employee table:\n`)
    })
        .catch(console.log)
}
//Function to update the role of a selected employee
updateEmployeeRole = () => { 
    console.log('Update Employee Role Test')
}
//function to create a query to view all the roles
viewRoles = () => { 
    const sql = `SELECT 
    role.title,
    department.name AS department,
    role.salary
  FROM employee employee
  INNER JOIN role role ON employee.role_id = role.id
  INNER JOIN department department ON role.department_id = department.id;`; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\nThere are Currently ${rows.length} Roles Available\n`)
        console.table(rows);
    })
        .catch(console.log)
}
//function to add a role to the roles table
addRole = () => { 
    console.log('Add Role Test')
}
//function to create a query to view departments
viewDepartment = () => { 
    const sql = `SELECT * from department;`; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\nThere are Currently ${rows.length} Departments\n`)
        console.table(rows);
    })
        .catch(console.log)
}
//function to add a department to the department table
addDepartment = () => {
    console.log('Add Department Test')
 }
//function to update and employees manager
updateEmployeeManager = () => { 
    console.log('Update Employee Manager Test')
}
//function to create a query that views employees by manager only
viewEmployeesByManager = () => { 
    const sql = `SELECT e1.first_name AS employee_first_name, e1.last_name AS employee_last_name, 
    e2.first_name AS manager_first_name, e2.last_name AS manager_last_name
FROM employee e1
JOIN employee e2 ON e1.manager_id = e2.id
WHERE e1.manager_id IS NOT NULL;`; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\n${rows.length} Employees Currently have a Manager\n`)
        console.table(rows);
    })
        .catch(console.log)
}
//function to create a query that views employees by department
viewEmployeesByDepartment = () => { 
    console.log('View Employees by Department Test')
}
//function to delete a department, role or employee.
deleteDepartmentRoleEmployee = () => {
    console.log('Delete Department, Role or Employee.')
 }
//function to view the department budget for a selected department.
viewDepartmentBudget = () => { 

    const sql = `SELECT d.name AS department_name, SUM(r.salary) AS total_budget
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    GROUP BY d.name;
    `; 
  
    connection.promise().query(sql)
        .then(([rows, fields]) => {
        console.log(`\nBelow is the total budget for each Department.\n`)
        console.table(rows);
    })
        .catch(console.log)
}
//function to quit the app
Quit = () => { 
    console.log('Quit Test')
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
});
