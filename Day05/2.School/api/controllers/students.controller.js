const mongoose = require("mongoose");

const Student = mongoose.model(process.env.STUDENT_MODEL);

const getAll = function(req,res){
    let count = parseInt(process.env.COUNT, process.env.RADIX);
    let offset = parseInt(process.env.OFFSET, process.env.RADIX);

    if(req.query.count && req.query){
        count = parseInt(req.query.count, process.env.COUNT);
    }
    if(req.query.offset && req.query){
        offset = parseInt(req.query.offset, process.env.RADIX);
    }

    Student.find().skip(offset).limit(count).exec(function(err, students){
        if(err){
            console.log("Error occured", err);
            res.status(500).end("Internal server error");
        }
        res.status(200).json(students);
    });

}

const getOne = function(req, res){
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function(err, student){
        if(err){
            console.log("Error occured", err);
            res.status(500).end("Game not found")
        }
        res.status(200).json(student);
    });
}

module.exports = {
    getAll,
    getOne
}