-- Drops the employees_DB if it exists currently --
DROP DATABASE IF EXISTS employees_DB;
-- Creates the "employees_DB" database --
CREATE database employees_DB;

-- Makes it so all of the following code will affect employees_DB --
USE employees_DB;

-- Creates the table "employee" within employees_DB --
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- SELECT * FROM employee;
-- select * from role;
-- select * from department;

/* EMPLOYEES */
-- Creates new rows containing data in all named columns --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupic", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 8, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tammer", "Galal", 4, 5);

/* ROLES */
-- Creates new rows containing data in all named columns --
INSERT INTO role (title, salary department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO role (title, salary)
VALUES ("Salesperson", 80000);

INSERT INTO role (title, salary)
VALUES ("Lead Engineer", 150000);

INSERT INTO role (title, salary)
VALUES ("Software Engineer", 120000);

INSERT INTO role (title, salary)
VALUES ("Account Manager", 160000);

INSERT INTO role (title, salary)
VALUES ("Account", 125000);

INSERT INTO role (title, salary)
VALUES ("Legal Team Lead", 250000);

INSERT INTO role (title, salary)
VALUES ("Lawyer", 190000);

/* DEPARTMENTS */
-- Creates new rows containing data in all named columns --
INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Sales");


-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";
