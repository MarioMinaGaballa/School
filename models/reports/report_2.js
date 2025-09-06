const db = require("../../models/db");
const data = async (id) => {
  try {
    const { rows } = await db.query(
      "select s.subject_name, t.first_name,t.last_name from students_subjects AS ss inner join subjects AS s  on s.subject_id = ss.subject_id inner join teachers t  on t.teacher_id = ss.teacher_id where ss.student_id = $1",
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching report data", error);
  }
};

const isValidStudentId = async (id) => {
  try {
    const { rows } = await db.query(
      "select * from students where student_id = $1",
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
  isValidStudentId,
};
