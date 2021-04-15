const express = require("express");
const router = express.Router();

const {
  addNewEmployee,
  sendEmployee,
  findById,
  getAllEmployees,
} = require("../controllers/employees-controller");

const { login, isAuthenticated } = require("../controllers/auth-controller");

router.post("/signup", addNewEmployee, findById, sendEmployee);

router.post("/signin", login, isAuthenticated, (req, res) => {
  console.log("authenticated!");
});

module.exports = router;
