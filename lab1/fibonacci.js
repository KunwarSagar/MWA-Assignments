const fibonacci = function(number){

    number = Math.abs(number);

    if (number <= 2) {
    
        return 1;
    
    } else {
    
        return fibonacci(number-1) + fibonacci(number-2);
    
    }

}

// console.log(fibonacci(30));
// console.log(fibonacci(-15));
// console.log(fibonacci(15));

module.exports.calculate = fibonacci;