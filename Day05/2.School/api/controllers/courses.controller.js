const mongoose = require("mongoose");

const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAll = function(req, res){
    const studentId = req.params.studentId;
    Student.findById(studentId).select('courses').exec(function(err, student){
        if(err){
            console.log("Error", err);
            res.status(500).end("Internal server error");
        }
        res.status(200).json(student.courses);
    })
}

const getOne = function(req, res){
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    Student.findById(studentId).select('courses').exec(function(err, student){
        if(err){
            console.log("Error", err);
            res.status(500).end("Internal server error");
        }
        res.status(200).json(student.courses.id(courseId));
    });
}

module.exports = {
    getAll,
    getOne
}