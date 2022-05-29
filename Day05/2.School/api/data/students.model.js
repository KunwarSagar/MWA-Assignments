const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    name: String,
    code: String
});

const studentsSchema = mongoose.Schema({
    name: String,
    gpa: Number,
    courses : [coursesSchema]
});

mongoose.model(process.env.STUDENT_MODEL, studentsSchema, process.env.DB_STUDENTS_COLLECTION)
