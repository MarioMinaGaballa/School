const teacher = require("../models/teacher");

const createTeacher = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name) {
      res.status(400).send("first name and last name are required");
    }

    const existingTeacher = await teacher.findTeacherByEmail(email);
    if (existingTeacher) {
      return res.status(409).send("Student with the same email already exists");
    } else {
      const newTeacher = await teacher.createTeacher(
        first_name,
        last_name,
        email
      );
      res.status(201).json(newTeacher);
      console.log(newTeacher);
    }
  } catch (error) {
    console.error("Error creating student", error);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    const currentTeacher = await teacher.getTeacherById(id);
    if (!currentTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (email && email !== currentTeacher.email) {
      const teacherWithNewEmail = await teacher.findTeacherByEmail(email);
      if (teacherWithNewEmail) {
        return res.status(409).json({
          message: "This email is already in use by another teacher.",
        });
      }
    }

    const updatedData = {
      id: id,
      first_name: first_name || currentTeacher.first_name,
      last_name: last_name || currentTeacher.last_name,
      email: email || currentTeacher.email,
    };

    const updatedTeacher = await teacher.updateTeacher(updatedData);
    res.json(updatedTeacher);
  } catch (error) {
    console.error("Error updating teacher", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const currentTeacher = await teacher.getTeacherById(id);
    if (!currentTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    await teacher.deleteTeacher(id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};


const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacher.getAllTeachers();
    res.json(teachers);
  }catch (error) {
    console.error("Error fetching teachers", error);
    res.status(500).json({ message: "An internal server error occurred" });
}
}
module.exports = { createTeacher, updateTeacher, deleteTeacher,getAllTeachers };
