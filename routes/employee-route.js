const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addNewEmployee,
  findById,
  editEmployee,
  deleteEmployee,
} = require("../controllers/employees-controller");

router.get("/", getAllEmployees, (req, res) => {
  console.log(req.employees);
  res.json({ data: req.employees });
});

router.get("/:id", findById, (req, res) => {
  res.send(req.employee[0]);
});

router.post("/", addNewEmployee, findById, (req, res) => {
  res.send({ id: req.employee[0].id, ...req.body });
});

router.put("/:id", editEmployee, findById, (req, res) => {
  res.send(req.body);
});

router.delete("/:id", deleteEmployee, getAllEmployees, (req, res) => {
  res.send("employee deleted");
});

module.exports = router;
