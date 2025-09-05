const db = require("../models/db");
const { v4: uuidv4 } = require("uuid");

const getAllStudents = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM students");
    return rows;
  } catch (error) {
    console.error("Error fetching students", error);
  }
};

const getStudent = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM students WHERE student_id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching student by ID", error);
  }
};

const createStudent = async (first_name, last_name, email) => {
  const newStudentId = uuidv4();
  try {
    const rows = await db.query(
      "INSERT INTO students (student_id,first_name,last_name,email) Values($1,$2,$3,$4)",
      [newStudentId, first_name, last_name, email]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating student", error);
  }
};

const findStudentByEmail = async (email) => {
  try {
    const { rows } = await db.query(
      "SELECT email FROM students WHERE email = $1",
      [email]
    );
    if (rows.length !== 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error finding student by name", error);
  }
};

const getStudentById = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM students WHERE student_id = $1",
      [id]
    );
    if (rows.length !== 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error finding student by ID", error);
  }
};

const updateStudent = async (studentData) => {
  const { id, first_name, last_name, email } = studentData;
  try {
    const { rows } = await db.query(
      "UPDATE students SET first_name=$1,last_name=$2,email=$3 WHERE student_id=$4 RETURNING *",
      [first_name, last_name, email, id]
    );
    console.log(rows[0]);
    return rows[0]; // لو محتاج ترجع الطالب بعد التحديث
  } catch (error) {
    console.error("Error updating student", error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById: getStudent,
  createStudent,
  findStudentByEmail,
  updateStudent,
};
