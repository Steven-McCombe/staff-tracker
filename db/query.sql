--Query to add an Employee
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('John', 'Doe', NULL, 1);

-- Query to view all roles
SELECT 
  role.title,
  department.name AS department,
  role.salary
FROM employee employee
INNER JOIN role role ON employee.role_id = role.id
INNER JOIN department department ON role.department_id = department.id;

-- query to view employees by manager
SELECT e1.first_name AS employee_first_name, e1.last_name AS employee_last_name, 
       e2.first_name AS manager_first_name, e2.last_name AS manager_last_name
FROM employee e1
JOIN employee e2 ON e1.manager_id = e2.id
WHERE e1.manager_id IS NOT NULL;

--query to view sallary by department
SELECT d.name AS department_name, SUM(r.salary) AS total_salary
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id
WHERE d.name = Sales
GROUP BY d.name;

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