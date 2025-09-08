const express = require("express");
const app = express();
const studentRoutes = require("./routes/student");
const teacherRoutes = require("./routes/teacher");
const reportsRoutes = require("./routes/reports/reports");
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/reports", reportsRoutes);

module.exports = app;

