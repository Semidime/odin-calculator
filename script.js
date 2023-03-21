let displayValue = 0;
let operator = "";
let firstNumber = 10;
let secondNumber = 5;



/* event listeners */
/* 1. clear button - calls reset function*/
    const clrBtn = document.querySelector('#clear-button');
    clrBtn.addEventListener('click',function () {reset()});

/* 2. equals button - calls operate */
    const eqlBtn = document.querySelector('#equals-button');
    eqlBtn.addEventListener('click', function () { 
        operate();
    });

/* .3 operator buttons - sets operator variable value */
    const opBtns = document.querySelectorAll('.op-button');

    /* removes 'selected-op' class from prev selection
    updates operator variable with new value, 
    and adds 'selected-op' class to new selection */
    opBtns.forEach((opBtn) => {
        opBtn.addEventListener('click', () => {  
            if(operator!=="") {removeSelected()};               
            operator = opBtn.textContent;
            opBtn.classList.add('selected-op');
            console.log(operator);
        });
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
    if (operator === "+") {
        displayValue = add(a,b);
    } else if (operator === "-") {
        displayValue = subtract(a,b);
    } else if (operator === "*") {
        displayValue = multiply(a,b);                      
    } else if (operator === "/") {
        displayValue = divide(a,b);
    }
    console.log(displayValue);
    if(operator!=="") {removeSelected()};
    operator = "";
}

function reset() {
    if(operator!=="") {removeSelected()}
    operator = "";
    firstNumber = undefined;
    secondNumber = undefined;
    displayValue = 0;
    console.log(displayValue);
    /* remove selected operator highlight  */
}

function removeSelected () {
    const selectedBtn = document.querySelector('.selected-op')
        selectedBtn.classList.remove('selected-op');
    }