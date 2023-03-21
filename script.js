/* variables */
let displayValue = 0;
let operator = "";
let firstNumber = 10;
let secondNumber = 20;

/* set initial display */
const display = document.getElementById('display');
display.textContent = 0



/* event listeners */
/* 1. clear button - calls reset function*/
    const clrBtn = document.querySelector('#clear-button');
    clrBtn.addEventListener('click',function () {reset()});

/* 2. equals button - calls operate */
    const eqlBtn = document.querySelector('#equals-button');
    eqlBtn.addEventListener('click', function () {operate()});

/* 3. operator buttons - sets operator variable value */
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

/* x. update display value on each button click*/
/*     const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
            button.addEventListener('click', () => {
            display.textContent = `${displayValue}`;
        });
      }); */

/* 4. calc-digits - build displayValue */
    const digitBtns = document.querySelectorAll('div.calc-digits button');
    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('click', () => {
            if (displayValue === 0 || displayValue === "0") {
                displayValue = digitBtn.textContent;
            } else {
                displayValue += digitBtn.textContent
            }
            display.textContent = `${displayValue}`
        })
    })

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

/* operate function - calls a basic calculator function based on the 
selected operator */
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
    display.textContent = `${displayValue}`;

    /* reset displayValue to zero*/
    displayValue = 0;
    if(operator!=="") {removeSelected()};
    operator = "";
}

function reset() {
    if(operator!=="") {removeSelected()}
    operator = "";
    firstNumber = undefined;
    secondNumber = undefined;
    displayValue = 0;
    display.textContent = `${displayValue}`;
}

function removeSelected () {
    const selectedBtn = document.querySelector('.selected-op')
        selectedBtn.classList.remove('selected-op');
    }