const studentModal = require('../models/studentsModal');
const handleFactory = require('./handleFactory');

exports.getAllStudents = handleFactory.getAll(studentModal);
exports.getStudentById = handleFactory.getOne(studentModal);
exports.updateStudent = handleFactory.updateOne(studentModal);
