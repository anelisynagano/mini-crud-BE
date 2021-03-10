const Employee = require("../models/Employee");

const getAllEmployees = (req, res, next) => {
  Employee.getAll((err, results) => {
    if (err) {
      return res.json(err);
    }
    req.employees = results;
    next();
  });
};

const addNewEmployee = (req, res, next) => {
  Employee.addNew(req.body, req.employees, (err, results) => {
    if (err) res.json(err);
    req.id = results;
    next();
  });
};

const findById = (req, res, next) => {
  if (req.id === undefined) {
    Employee.findById(+req.params.id, (err, results) => {
      if (err) res.json(err);
      req.employee = results;
      next();
    });
  } else {
    Employee.findById(req.id.insertId, (err, results) => {
      if (err) res.json(err);
      req.employee = results;
      next();
    });
  }
};

const editEmployee = (req, res, next) => {
  Employee.editById(req.params.id, req.body, (err, results) => {
    if (err) res.json(err);
    req.employee = results;
    next();
  });
};

const deleteEmployee = (req, res, next) => {
  Employee.deleteById(req.params.id, (err) => {
    if (err) res.json(err);
    next();
  });
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  findById,
  editEmployee,
  deleteEmployee,
};
