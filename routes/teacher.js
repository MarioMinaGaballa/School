const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

router.get('/', teacherController.getAllTeachers);
// router.get('/:id', teaherController.getSingleStudent);
router.post('/createTeacher', teacherController.createTeacher);
router.put('/updateTeacher/:id', teacherController.updateTeacher);
router.delete('/deleteTeacher/:id', teacherController.deleteTeacher);

module.exports = router;