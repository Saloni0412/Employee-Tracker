const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db"
  },
  console.log("connected to db")
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const questions = [
  {
    type: "list",
    name: "databaseQuestion",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
    ]
  }
]

// function to prompt questions
let init = function() {
  inquirer.prompt(questions).then((data) => {
    console.log(data)
  
const { databaseQuestion } = data;

if (databaseQuestion === "view all departments") {
  viewDepartments();
} else if (databaseQuestion === "view all roles") {
  viewRoles();
} else if (databaseQuestion === "view all employees") {
  viewEmployees();
} else if (databaseQuestion === "add a department") {
  addDepartment();
} else if (databaseQuestion === "add a role") {
  addRole();
// } else if (databaseQuestion === "add an employee") {
//   addEmployee()
// } else if (databaseQuestion === "update an employee role") {
//   UpdateRole();
}
})
}

init();

// function to view all department data
function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init();
  });
}

// function to view role data
function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    init();
  });
}

// function to view employee data
function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    console.table(results);
    init();
  });
}

//fucntion to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department:",
        validate: function (input) {
          if (input.trim() === "") {
            return "Department name cannot be empty.";
          }
          return true;
        }
      }
    ])
    .then((data) => {
      const departmentName = data.departmentName;
      
      const query = "INSERT INTO department (departmentName) VALUES (?)";

      db.query(query, [departmentName], function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log(`Department '${departmentName}' added successfully.`);
        }
        
        viewDepartments();
        init();
      });
    });
}

// function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the role:",
        validate: function (input) {
          if (input.trim() === "") {
            return "Role title cannot be empty.";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the role:",
        validate: function (input) {
          if (!/^\d+$/.test(input)) {
            return "Salary must be a positive integer.";
          }
          return true;
        }
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for the role:",
        validate: function (input) {
          if (!/^\d+$/.test(input)) {
            return "Department ID must be a positive integer.";
          }
          return true;
        }
      }
    ])
    .then((data) => {
      const { roleTitle, roleSalary, departmentId } = data;
      
      const query = "INSERT INTO role (Title, Salary, DepartmentId) VALUES (?, ?, ?)";

      db.query(query, [roleTitle, roleSalary, departmentId], function (err, result) {
        if (err) {
          console.error(err);
        } else {
          console.log(`Role '${roleTitle}' added successfully.`);
        }
        viewRoles();
        init();
      });
    });
}
