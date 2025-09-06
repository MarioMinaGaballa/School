const Student = require("../models/student");

const getStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students", error);
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.getStudentById(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student by ID", error);
  }
};

const createStudent = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name) {
      res.status(400).send("first name and last name are required");
    }

    const existingStudent = await Student.findStudentByEmail(email);
    if (existingStudent) {
      return res.status(409).send("Student with the same email already exists");
    } else {
      const newStudent = await Student.createStudent(
        first_name,
        last_name,
        email
      );
      res.status(201).json(newStudent);
      console.log(newStudent);
    }
  } catch (error) {
    console.error("Error creating student", error);
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    const currentStudent = await Student.getStudentById(id);
    if (!currentStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (email && email !== currentStudent.email) {
      const studentWithNewEmail = await Student.findStudentByEmail(email);
      if (studentWithNewEmail) {
        return res.status(409).json({
          message: "This email is already in use by another student.",
        });
      }
    }

    const updatedData = {
      id: id,
      first_name: first_name || currentStudent.first_name,
      last_name: last_name || currentStudent.last_name,
      email: email || currentStudent.email,
    };

    const updatedStudent = await Student.updateStudent(updatedData);
    res.status(200).json(updatedStudent);
    console.log(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const currentStudent = await Student.getStudentById(id);
    if (!currentStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    await Student.deleteStudent(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
