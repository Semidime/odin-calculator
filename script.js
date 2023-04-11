/* variables */
let displayValue = 0;
let operator = "";
let firstNumber = undefined;
let secondNumber = undefined;
let overwriteDV = 0;

/* set initial mainDisplay */
const mainDisplay = document.getElementById('main-display');
const minorDisplay = document.getElementById('minor-display');
mainDisplay.textContent = 0;



/* event listeners */
/* 1. clear button - calls reset function*/
    const clrBtn = document.querySelector('#clear-button');
    clrBtn.addEventListener('click',function () {reset()});

/* 2. operator buttons - 
        removes 'selected-op' class from prev selection
        updates operator variable with new value, 
        and adds 'selected-op' class to new selection
        assign current display value to firstNumber,
        update display*/
    const opBtns = document.querySelectorAll('.op-button');

    opBtns.forEach((opBtn) => {
        opBtn.addEventListener('click', () => {  

            if(operator !== "") {removeSelected()};                          
            operator = opBtn.textContent;
            opBtn.classList.add('selected-op');
            /* console.log(operator); */

            assignFirstNumber();
            overwriteDV = 1;

            mainDisplay.textContent = displayValue
            minorDisplay.textContent = `${firstNumber} ${operator}`
        });
    });

/* 3. equals button - assigns secndNumber variable and calls operate */
    const eqlBtn = document.querySelector('#equals-button');
    
    eqlBtn.addEventListener('click', function () {
        assignSecondNumber();
        operate();
    });

/* 4. calc-digits - build displayValue */
    const digitBtns = document.querySelectorAll('div.calc-digits button');
    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('click', () => {
            if (displayValue === 0 || displayValue === "0" || overwriteDV === 1) {
                displayValue = digitBtn.textContent;
                overwriteDV = 0;
            } else {
                displayValue += digitBtn.textContent
            }
            mainDisplay.textContent = `${displayValue}`
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
    mainDisplay.textContent = `${displayValue}`;
    minorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;

    /* set overwriteDV to 1*/
    overwriteDV = 1;

    /* reset operator to empty string */
/*     if(operator!=="") {removeSelected()};
    operator = ""; */
}

function reset() {
    if(operator!=="") {removeSelected()}
    operator = "";
    firstNumber = undefined;
    secondNumber = undefined;
    displayValue = 0;
    overwriteDV = 0;
    mainDisplay.textContent = `${displayValue}`;
    minorDisplay.textContent = "";
}

function removeSelected () {
    const selectedBtn = document.querySelector('.selected-op')
        selectedBtn.classList.remove('selected-op');
    }

function assignFirstNumber() {
    firstNumber = Number(displayValue);
/*     console.log(firstNumber) */
}

function assignSecondNumber() {
    secondNumber = Number(displayValue);
/*     console.log(secondNumber) */
}