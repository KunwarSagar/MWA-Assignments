const multiply = function(req, res){
    let first = 0;
    let second = 0;
    
    if(req.params.firstNumber){
        first = parseInt(req.params.firstNumber, 10);
    }
    if(req.query.secondNumber){
        second = parseInt(req.query.secondNumber, 10);
    }
    res.status(200).json({'firstNumber': first, 'secondNumber': second,'Result': first*second});
}

module.exports = {multiply};