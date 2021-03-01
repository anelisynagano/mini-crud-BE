const connection = require("../config");

const Employee = {};

Employee.getAll = (callback) => {
  connection.query("SELECT * FROM employee", (err, result, fields) => {
    callback(err, result, fields);
  });
};

Employee.addNew = (req, id, callback) => {
  const { name, role } = req;
  connection.query(
    "INSERT INTO employee (name, role) VALUES (?, ?)",
    [name, role],
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.findById = (id, callback) => {
  connection.query(
    `SELECT * FROM employee WHERE id=${id}`,
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.editById = (id, newInfo, callback) => {
  connection.query(
    `UPDATE employee SET name = "${newInfo.name}", role = "${newInfo.role}"
  WHERE
  id = ${id}`,
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.deleteById = (id, callback) => {
  connection.query(
    `DELETE FROM employee WHERE id = ${id}`,
    (err, results, fields) => {
      callback(err, results, fields);
    }
  );
};

module.exports = Employee;
