const connection = require("../config");
const bcrypt = require("bcryptjs");

const Employee = {};

Employee.getAll = (callback) => {
  connection.query("SELECT * FROM employee", (err, result, fields) => {
    callback(err, result, fields);
  });
};

Employee.addNew = async (req, id, callback) => {
  const { name, role, password, email } = req;
  const hashedPassword = await bcrypt.hash(password, 10);
  connection.query(
    "INSERT INTO employee (name, role, password, email) VALUES (?, ?, ?, ?)",
    [name, role, hashedPassword, email],
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.findByEmail = (email, callback) => {
  connection.query(
    "SELECT * FROM employee WHERE email=?",
    [email],
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.findById = (id, callback) => {
  connection.query(
    `SELECT * FROM employee WHERE id=?`,
    [id],
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.editById = (id, newInfo, callback) => {
  connection.query(
    `UPDATE employee SET name = "?", role = "?"
  WHERE
  id = ?`,
    [newInfo.name, newInfo.role, id],
    (err, result, fields) => {
      callback(err, result, fields);
    }
  );
};

Employee.deleteById = (id, callback) => {
  connection.query(
    `DELETE FROM employee WHERE id = ?`,
    [id],
    (err, results, fields) => {
      callback(err, results, fields);
    }
  );
};

module.exports = Employee;
