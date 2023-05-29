-- Create a new database --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Use employee_db --
USE employee_db;

CREATE TABLE department (
  DepartmentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departmentName VARCHAR(30) 
);

CREATE TABLE role (
  RoleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(30),
  Salary DECIMAL,
  DepartmentID INT,
  FOREIGN KEY (DepartmentID)
  REFERENCES department(DepartmentID)
);

CREATE TABLE employee (
  employeeID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  First_name VARCHAR(30),
  Last_name VARCHAR(30),
  RoleID INT,
  ManagerID INT,
  FOREIGN KEY (RoleID)
  REFERENCES role(RoleID)
);