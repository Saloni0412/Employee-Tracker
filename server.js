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
// } else if (databaseQuestion === "view all employees") {
//   viewEmployees();
// } else if (databaseQuestion === "add a department") {
//   addDepartment();
// } else if (databaseQuestion === "add a role") {
//   addRole();
// } else if (databaseQuestion === "add an employee") {
//   addEmployee()
// } else if (databaseQuestion === "update an employee role") {
//   UpdateRole();
}
})
}

init();

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    init();
  });
}

function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    console.table(results);
    init();
  });
}
