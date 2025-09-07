const db = require("../../models/db");

const data = async (orderby) => {
  try {
  
    const allowedSortColumns = {
      't.first_name': 't.first_name',
      't.last_name': 't.last_name',
      's.first_name': 's.first_name',
      's.last_name': 's.last_name'
    };


    const sortColumn = allowedSortColumns[orderby] || 't.first_name'; 


    const sqlQuery = `
      SELECT 
        s.first_name AS first_name_student, 
        s.last_name AS last_name_student, 
        t.first_name AS first_name_teacher, 
        t.last_name AS last_name_teacher 
      FROM 
        teachers AS t 
      INNER JOIN 
        students_subjects AS ss ON ss.teacher_id = t.teacher_id 
      INNER JOIN 
        students s ON ss.student_id = s.student_id 
      ORDER BY 
        ${sortColumn}
    `;
    
    const { rows } = await db.query(sqlQuery); 

    return rows;
  } catch (error) {
    console.error("Error fetching report data", error);
    throw error;
  }
};

module.exports = { data };