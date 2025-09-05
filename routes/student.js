const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getSingleStudent);
router.post('/createStudent', studentController.createStudent);
router.put('/updateStudent/:id', studentController.updateStudent);

module.exports = router;