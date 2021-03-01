const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const employeesRouter = require("./routes/employee-route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/employees", employeesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server listening to port ${process.env.PORT}`)
);
