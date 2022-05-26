require("dotenv").config();

const students = require("./../data/school.json")

const getAll = function(req, res){
    let count = process.env.COUNT;
    let offset = process.env.OFFSET;
    
    if(req.query.count && req.query){
        count = parseInt(req.query.count, process.env.RADIX);
    }
    if(req.query.offset && req.query){
        offset = parseInt(req.query.offset, process.env.RADIX);
    }
    const pagedStudents = students.slice(offset, count+offset);

    res.status(200).json(pagedStudents);
}

const getOne = function(req, res){
    const index = req.params.index;
    if(index > students.length-1){
        res.status(404).json({"message":"not found"});
    }
    res.status(200).json(students[index]);
}

module.exports= {
    getAll,
    getOne
}