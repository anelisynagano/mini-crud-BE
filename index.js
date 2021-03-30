const express = require("express");
const app = express();
require("dotenv").config();

const employeesRouter = require("./routes/employee-route");
const authRouter = require("./routes/auth-route");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/auth", authRouter);

app.use("/employees", employeesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening to port ${port}`));
