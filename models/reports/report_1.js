const db = require("../../models/db");
const data = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT sub.subject_name, s.first_name AS student_first_name, s.last_name AS student_last_name FROM students_subjects AS ss INNER JOIN students AS s ON ss.student_id = s.student_id INNER JOIN subjects AS sub ON ss.subject_id = sub.subject_id WHERE ss.teacher_id = $1;",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching report data", error);
  }
};

const isValidTeacherId = async (id) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM teachers WHERE teacher_id = $1",
      [id]
    );
    if (rows.length === 0) {
      throw new Error("Invalid ID: No teacher found with the provided ID");
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error validating ID", error);
  }
};

module.exports = {
  data,
  isValidTeacherId,
};
