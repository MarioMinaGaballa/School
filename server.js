const express = require('express');
const app = express();
const studentRoutes = require('./routes/student');

app.use(express.json());

app.use('/api/students', studentRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});