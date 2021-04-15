const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const Employee = require("../models/Employee");

app.use(express.json());
app.use(cookieParser());

const login = (req, res, next) => {
  const { email, password } = req.body;
  Employee.findByEmail(email, async (err, results) => {
    const user = results[0];
    const userPass = user.password;
    const isMatch = await bcrypt.compare(password, userPass);

    if (email === user.email && isMatch) {
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
        })
        .send("token created and cookie sent");
    } else {
      res.status(401).json({ message: "wrong credentials" });
    }
  });
  next();
};

const isAuthenticated = (req, res, next) => {
  if (!req.cookies.token) {
    const err = new Error("unauthorized");
    err.statusCode = 401;
    throw err;
  } else {
    jwt.verify(req.cookies.token, "secret", (err, decoded) => {
      if (err) {
        throw new Error(err);
      }
      req.userId = decoded.id;
      console.log(req.userId);
      next();
    });
  }
};

module.exports = { login, isAuthenticated };
