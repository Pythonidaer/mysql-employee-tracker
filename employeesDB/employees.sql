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



/* ROLES */
-- Creates new rows containing data in all named columns --
INSERT INTO role (title, salary)
VALUES ("Sales Lead", 100000);

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



-- Creates new rows containing data in all named columns --
INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", false);

-- Updates the row where the column name is peter --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE name = "Peter";

-- SELECT * FROM employee;
-- select * from role;
-- select * from department;
