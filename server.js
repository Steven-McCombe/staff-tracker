const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Require inquirer
const inquirer = require('inquirer');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
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
                    startPrompt();
                    break
                }
                case 'Add Employees': { 
                    addEmployees();
                    startPrompt();
                    break
                }
                case 'Update Employee Role': { 
                    updateEmployeeRole();
                    startPrompt();
                    break
                }
                case 'View All Roles': { 
                    viewRoles();
                    startPrompt();
                    break
                }
                case 'Add Role': {
                    addRole();
                    startPrompt();
                    break
                 }
                case 'View all Departments': {
                    viewDepartment();
                    startPrompt();
                    break
                }
                case 'Add Department': {
                    addDepartment();
                    startPrompt();
                    break
                }
                case 'Update Employee Managers': {
                    updateEmployeeManager();
                    startPrompt();
                    break
                }
                case 'View Employees by Manager': {
                    viewEmployeesByManager();
                    startPrompt();
                    break
                }
                case 'View Employees by Department': { 
                    viewEmployeesByDepartment();
                    startPrompt();
                    break
                }
                case 'Delete Departments, Roles and Employees': { 
                    deleteDepartmentRoleEmployee();
                    startPrompt();
                    break
                }
                case 'View Department Budget': {
                    viewDepartmentBudget();
                    startPrompt();
                    break
                }
                case 'Quit': {
                    Quit();
                    startPrompt();
                    break
                }
                    
            }
        } )
}
startPrompt();
//function to create a query to view employees
viewEmployees = () => { 
    console.log('View Employees Test')
}
//function to add employees to the employee table
addEmployees = () => { 
    console.log('Add Employees Test')
}
//Function to update the role of a selected employee
updateEmployeeRole = () => { 
    console.log('Update Employee Role Test')
}
//function to create a query to view all the roles
viewRoles = () => { 
    console.log('View Roles Test')
}
//function to add a role to the roles table
addRole = () => { 
    console.log('Add Role Test')
}
//function to create a query to view departments
viewDepartment = () => { 
    console.log('View Department Test')
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
    console.log('View Employees by manager Test')
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
    console.log('View Department budget Test')
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
  console.log(`Server running on port ${PORT}`);
});
