-- inserts value in department table
INSERT INTO department (departmentName)
VALUES
    ("Personal Banking"),
    ("Contact Centre"),
    ("Human Resources"),
    ("Access Services"),
    ("Credit Services"),
    ("Fraud Department");

-- inserts value in role table
INSERT INTO role (Title, Salary, DepartmentID)
VALUES
    ("IT Analyst", 65000, 4),
    ("Payroll agent", 50000, 3),
    ("Fraud Analyst", 45000, 6),
    ("Customer Service Reprentative", 38000, 2),
    ("Credit Officer", 50000, 5),
    ("Teller", 43000, 1);

-- inserts value in employee table
INSERT INTO employee (First_name, Last_name, RoleID, ManagerID)
VALUES
    ("John", "Doe", 2, 2),
    ("Jasmine", "Rue", 1, 3),
    ("Jay", "Smith", 3, 4),
    ("Emi", "Dawn", 2, NULL),
    ("Saloni", "Patel", 4, 1),
    ("Vish", "Shukla", 3, NULL);