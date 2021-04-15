const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addNewEmployee,
  findById,
  editEmployee,
  deleteEmployee,
  sendAllEmployees,
  sendEmployee,
  deletedResponse,
} = require("../controllers/employees-controller");

const { isAuthenticated } = require("../controllers/auth-controller");

router.get("/", isAuthenticated, getAllEmployees, sendAllEmployees);

router.get("/:id", findById, sendEmployee);

router.post("/", addNewEmployee, findById, sendEmployee);

router.put("/:id", editEmployee, findById, sendEmployee);

router.delete("/:id", deleteEmployee, getAllEmployees, deletedResponse);

module.exports = router;
