const db = require("../../models/db");

const data = async (orderby) => {
  try {
    const { rows } = await db.query(
      "select s.first_name AS first_name_student, s.last_name AS Last_name_student,t.first_name AS first_name_teacher,t.last_name AS last_name_teacher from teachers AS t  inner join students_subjects AS ss on ss.teacher_id = t.teacher_id inner join students s on  ss.student_id = s.student_id order by $1 ",
      [orderby]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching report data", error);
  }
};

module.exports = { data };
