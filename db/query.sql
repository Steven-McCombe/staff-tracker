-- Query to create a table showing first name, last name, title, department and salary.
-- SELECT 
--   employee.first_name,
--   employee.last_name,
--   role.title,
--   department.name AS department,
--   role.salary
-- FROM employee employee
-- INNER JOIN role role ON employee.role_id = role.id
-- INNER JOIN department department ON role.department_id = department.id;

-- Query to select all from departments;
-- SELECT * from department;

-- Query to select all roles;
-- SELECT * from role;

-- Query to select all employees;
-- SELECT * from employee;

-- Query to add a new department;
-- INSERT INTO department (name) VALUES ('Marketing');

-- Query to add a new role;
-- INSERT INTO role (title, salary, department_id) VALUES ('Marketing Manager, 90000, 5');

-- query to add a new employee;
-- INSERT INTO role (first_name, last_name, role_id, manager_id) VALUES ('steven, mccombe, 9, null');