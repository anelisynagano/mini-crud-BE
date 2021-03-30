const express = require("express");
const router = express.Router();

const {
  addNewEmployee,
  sendEmployee,
  findById,
} = require("../controllers/employees-controller");

const { authenticateEmployee } = require("../controllers/auth-controller");

router.post("/signup", addNewEmployee, findById, sendEmployee);

router.post("/signin", authenticateEmployee);

module.exports = router;
