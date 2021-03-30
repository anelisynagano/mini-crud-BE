const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const Employee = require("../models/Employee");

app.use(express.json());
app.use(cookieParser());

const authenticateEmployee = (req, res, next) => {
  const { email, password } = req.body;
  Employee.findByEmail(email, async (err, results) => {
    const userPass = results[0].password;
    console.log(results[0].password);
    const isMatch = await bcrypt.compare(password, userPass);
    console.log(isMatch);
  });
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   Employee.findByEmail(email, async (err, results) => {
//     console.log(results)
//     userPassword = results[0].password;
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const isPasswordEqual = await bcrypt.compare(hashedPassword, userPassword);
//   });

// if (email === user.email && isPasswordEqual) {
//   const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
//   res
//     .status(200)
//     .cookie("token", token, {
//       httpOnly: true,
//     })
//     .send("nice");
// } else {
//   res.status(401).json({ message: "wrong credentials" });
// }
//};

module.exports = { authenticateEmployee };
