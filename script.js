let displayValue = 0;
let operator = 1;
let firstNumber = 10;
let secondNumber = 5;



/* event listeners */
/* 1. clear button - calls reset function*/
    const clrBtn = document.querySelector("#clear-button");
    clrBtn.addEventListener('click',function () {reset()});

/* 2. equals button - calls operate */
    const eqlBtn = document.querySelector("#equals-button");
    eqlBtn.addEventListener('click', function () { 
        operate();
    });

/* basic addition function to return the sum of two numbers */
function add(a,b) {
    return a + b;
}

/* basic subtraction function to return the difference between 2 numbers */
function subtract(a,b) {
    return a - b;
}

/* basic multiplication function to return the product of two numbers */
function multiply(a,b) { 
    return a * b;
}

/* basic division function  to return the quotient of two numbers */
function divide(a,b) {
    return a / b;
}

/* operate function - accepts an operator and two numbers
calls a basic calculator function based on the operator */
function operate() {
    const a = firstNumber;
    const b = secondNumber;
    console.log(a);
    console.log(operator);
    console.log(b);
    if (operator === 1) {
        displayValue = add(a,b);
    } else if (operator === 2) {
        displayValue = subtract(a,b);
    } else if (operator === 3) {
        displayValue = multiply(a,b);                      
    } else if (operator === 4) {
        displayValue = divide(a,b);
    }
    console.log(displayValue);
}

function reset() {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    displayValue = 0;
    console.log(displayValue);
    /* remove selected operator highlight  */
}

