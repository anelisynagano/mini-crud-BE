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
    if (err) {
      res.json({ error: "email already in use" });
    } else {
      req.id = results;
      next();
    }
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

const sendAllEmployees = (req, res, next) => {
  res.status(200).json({ data: req.employees });
  next();
};

const sendEmployee = (req, res, next) => {
  res.status(200).send(req.employee[0]);
  next();
};

const deletedResponse = (req, res) => {
  res.send("employee deleted");
};

const handleError = (err, req, res, next) => {
  err.status = err.status || 500;
  if (err.status == 500) {
    console.log(err);
  }
  if (process.env.NODE_ENV === "production" && err.status === 500) {
    err.message = "Something went wrong...";
  }
  res.status(err.status || 500).json({ message: err.message });
};

module.exports = {
  getAllEmployees,
  addNewEmployee,
  findById,
  editEmployee,
  deleteEmployee,
  sendAllEmployees,
  sendEmployee,
  deletedResponse,
};
