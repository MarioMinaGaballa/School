const db = require("../models/db");

const { v4: uuidv4 } = require("uuid");

const findTeacherByEmail = async (email) => {
  try {
    const { rows } = await db.query(
      "SELECT email FROM teachers WHERE email = $1",
      [email]
    );
    if (rows.length !== 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error finding teacher by email", error);
  }
};

const createTeacher = async (first_name, last_name, email) => {
  const newTeacherId = uuidv4();
  try {
    const { rows } = await db.query(
      "INSERT INTO teachers (teacher_id,first_name,last_name,email) Values($1,$2,$3,$4) Returning *",
      [newTeacherId, first_name, last_name, email]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating teacher", error);
  }
};

const getTeacherById = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM teachers WHERE teacher_id = $1",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching teacher by ID", error);
  }
};
const updateTeacher = async (updatedData) => {
  try {
    const { id, first_name, last_name, email } = updatedData;
    const { rows } = await db.query(
      "UPDATE teachers SET first_name = $1, last_name = $2, email = $3 WHERE teacher_id = $4 RETURNING *",
      [first_name, last_name, email, id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error updating teacher", error);
  }
};

const deleteTeacher = async (id) => {
  try {
    const { rows } = await db.query(
      "DELETE FROM teachers WHERE teacher_id = $1 RETURNING *",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error deleting teacher", error);
  }
};

const getAllTeachers = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM teachers");
    return rows;
  }catch (error) {
    console.error("Error fetching teachers", error);
  }
}

module.exports = {
  findTeacherByEmail,
  createTeacher,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getAllTeachers
};
