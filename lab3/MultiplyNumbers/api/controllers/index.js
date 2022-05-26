require("dotenv").config();

const multiply = function(req, res){
    let first = 0;
    let second = 0;
    
    if(req.params.firstNumber){
        first = parseInt(req.params.firstNumber, process.env.RADIX);
    }
    if(req.query.secondNumber){
        second = parseInt(req.query.secondNumber, process.env.RADIX);
    }
    res.status(200).json({'firstNumber': first, 'secondNumber': second,'Result': first*second});
}

module.exports = {multiply};