// const child_process= require("child_process");
let fibo = require("./fibonacci")

console.log("1. Start of the program.");

// let fibo = child_process.spawn("node", ["./lab1/nonblockingfibonacci.js"], {stdio : "inherit"});

let timer = setTimeout(()=>{
     
    console.log(fibo.calculate(30));
    console.log(fibo.calculate(-15));
    console.log(fibo.calculate(15));

}, 0);

console.log("2. End of the program.")
