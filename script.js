/* global variables */
let displayValue = "0";
let operator = "";
let firstNumber = undefined;
let secondNumber = undefined;
let overwriteDV = 1;
let toggleAssignNumber = 0;
let userDVInput = 0;
let userEqlsInput = 0;

/* set initial mainDisplay */
const mainDisplay = document.getElementById('main-display');
const minorDisplay1 = document.getElementById('minor-display1');
const minorDisplay2 = document.getElementById('minor-display2');

mainDisplay.textContent = 0;


/* EVENT LISTENERS */
/* Mouse inputs */
    /* 1. calc-digits - build displayValue */
    const digitBtns = document.querySelectorAll('div.calc-digits button');

    digitBtns.forEach((digitBtn) => {
        digitBtn.addEventListener('mousedown',function () {buildDisplayValue(digitBtn.textContent)})
    }) 

    /* 2. operator buttons*/
    const opBtns = document.querySelectorAll('.op-button');

    opBtns.forEach((opBtn) => {
        opBtn.addEventListener('mousedown',function () {assignOperator(opBtn.textContent)})
    }) 

    /* 3. equals button*/
    const eqlBtn = document.querySelector('#equals-button');

    eqlBtn.addEventListener('mousedown', function () {
        if (toggleAssignNumber === 0) {
            assignSecondNumber();
            operate();
        } else {
            assignFirstNumber();
            operate();
        }
        userEqlsInput = 1;
    });

    /* 4. clear button - calls reset function*/
        const clrBtn = document.querySelector('#clear-button');
        clrBtn.addEventListener('mousedown',function () {reset()});

    /* 5. Delete button */
        const delBtn = document.querySelector('#backspace-button');
        delBtn.addEventListener('mousedown',function () {backspace()})

/* Keyboard inputs */
    const kbdDigits = ["0","1","2","3","4","5","6","7","8","9","."];
    const kbdOperators = ["+","-","*","/"];
    document.addEventListener('keydown', (event) => {    
    
    /*  1. Calc-digits - build displayValue */
        if (kbdDigits.includes(event.key)) {
            buildDisplayValue(event.key);

    /* 2. operator keys */
        } else if (kbdOperators.includes(event.key)) { 
            event.preventDefault();  
            assignOperator(event.key);    

    /* 3. equals (enter key)*/
        } else if (event.key === "Enter") {        
            if (toggleAssignNumber === 0) {
                assignSecondNumber();
                operate();
            } else {
                assignFirstNumber();
                operate();
            }              
            userEqlsInput = 1;

    /* 4. clear (Esc key) */
        } else if (event.key === "Escape") {        
            reset();
    
    /* delete (Backspace OR Delete key) */
        } else if (event.key === "Backspace" || event.key === "Delete" ) {
            backspace();
        
            /* exit if any other key pressed */    
        } else {   
            return
        };
    });
    
/* FUNCTIONS */

/* function to display user number inputs */
function buildDisplayValue(digit) {
    if (overwriteDV === 1 && digit === ".") {
        displayValue = "0.";
        overwriteDV = 0;
        userDVInput = 1;

    } else if (digit === "+/-") {
        if (displayValue === "0") {
            return
        } else if (displayValue.search(/\-/) === 0) {
            displayValue = displayValue.slice(1);
        } else {
            displayValue = "-" + displayValue; 
        } 

    } else if (digit === "0" && displayValue === "0") {
        displayValue = "0"
        return;

    } else if (overwriteDV === 1) {
        displayValue = digit;
        overwriteDV = 0;
        userDVInput = 1;

    } else if (digit === "." && displayValue.search(/\./) != -1) {
        return;

	} else if (displayValue.replaceAll(/[-.]/g,"").length >= 16) {
        return;

    } else {
        displayValue += digit;
    }
    console.log(displayValue)
    mainDisplay.textContent = `${formatDisplay(displayValue)}`
}

/* function to allow user to delete last displayValue input */
function backspace() {
    if ((displayValue.length == 2 && displayValue.charAt(0) === "-") ||
    displayValue === "-0." || ( displayValue.length == 1 && userDVInput == 1) ) {
        displayValue = "0";
        overwriteDV = 1;
        userDVInput = 0;

    } else if (displayValue.length > 1 && userDVInput == 1) {
        displayValue = displayValue.slice(0,-1);
    }

    mainDisplay.textContent = `${formatDisplay(displayValue)}`
 }

/* function to assign selected operator, assign values to firstNumber and secondNumber variables
 and call operate function */
function assignOperator(opSymbol) {
    /* remove formatting from prev. operator and apply to new operator */
    if (operator !== "") {removeSelected()};
    if (opSymbol === "+") {document.getElementById("add").classList.add('selected-op')};
    if (opSymbol === "-") {document.getElementById("subtract").classList.add('selected-op')};
    if (opSymbol === "*") {document.getElementById("multiply").classList.add('selected-op')};
    if (opSymbol === "/") {document.getElementById("divide").classList.add('selected-op')};

    if (firstNumber !== undefined && userDVInput == 1 && userEqlsInput !== 1) {
       /* assign current DV to secondNumber variable and call operate BEFORE
       updating operator variable */
       assignSecondNumber();
       operate(); 
       
       /* assign new operator variable */
       operator = opSymbol;
       
       /*  assign displayValue (i.e. result of operation) to firstNumber,
       set tAN to 0, set userEqlsInput to 0*/
       assignFirstNumber();
       toggleAssignNumber = 0;
       userEqlsInput = 0;

       /* update display */
       mainDisplay.textContent = `${formatDisplay(displayValue)}`;
       minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`;
       minorDisplay2.textContent = "";                

   } else {
       /* assign new operator variable */
       operator = opSymbol;
       
       /* assign current displayValue to firstNumber,
       set tAN to 0, set userEqlsInput to 0*/
       assignFirstNumber();
       toggleAssignNumber = 0;
       userEqlsInput = 0;
       
       /* update display */
       mainDisplay.textContent = `${formatDisplay(displayValue)}`;
       minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`;
       minorDisplay2.textContent = "";   
   }
}

/* operate function - calls a basic calculator function based on the 
selected operator */
function operate() {
    const a = firstNumber;
    const b = secondNumber;
    console.log(`${a} ${operator} ${b}`);

    if (operator === "") {
        return;
    } else if (operator === "+") {
        displayValue = `${add(a,b)}`;
    } else if (operator === "-") {
        displayValue = `${subtract(a,b)}`;
    } else if (operator === "*") {
        displayValue = `${multiply(a,b)}`;                      
    } else if (operator === "/" && b === 0) {
        divideByZero();
        return;
    } else if (operator === "/") {
        displayValue = `${divide(a,b)}`;
    }

    mainDisplay.textContent = `${formatDisplay(displayValue)}`;
    minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`;
    minorDisplay2.textContent = `${formatDisplay(secondNumber)} =`;

    /* set overwriteDV to 1
    set userDVInput to 0*/
    overwriteDV = 1;
    userDVInput = 0;
    /* set toggleAssignNumber to 1*/
    toggleAssignNumber = 1;
}

/* addition function to return the sum of two numbers */
function add(a,b) {
    return a + b;
}

/* subtraction function to return the difference between 2 numbers */
function subtract(a,b) {
    return a - b;
}

/* multiplication function to return the product of two numbers */
function multiply(a,b) { 
    return a * b;
}

/* division function  to return the quotient of two numbers */
function divide(a,b) {
    return a / b;
}

/* function to assign value to firstNumber variable */
function assignFirstNumber() {
    firstNumber = Number(displayValue);
    overwriteDV = 1;
    userDVInput = 0;
}

/* function to assign value to secondNumber variable */
function assignSecondNumber() {
    secondNumber = Number(displayValue);
    overwriteDV = 1;
    userDVInput = 0;
}

/* function to reset calculator and restore initial values */
function reset() {
    if(operator!=="") {removeSelected()}
    operator = "";
    firstNumber = undefined;
    secondNumber = undefined;
    displayValue = "0";
    overwriteDV = 1;
    userDVInput = 0;
    toggleAssignNumber = 0;
    mainDisplay.textContent = `${formatDisplay(displayValue)}`;
    minorDisplay1.textContent = "";
    minorDisplay2.textContent = "";
}

/* function to remove ".selected-op" class from prev. selected operator */
function removeSelected() {
    if (document.getElementsByClassName('selected-op').length > 0) {
        const selectedBtn = document.querySelector('.selected-op')
        selectedBtn.classList.remove('selected-op');
    } else {
        return;
    }
}

function divideByZero() {

    minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`
    minorDisplay2.textContent = `${formatDisplay(secondNumber)} =`
    mainDisplay.textContent = "I'm sorry Dave";
    mainDisplay.style.opacity = "0";

    setTimeout(() => {
        mainDisplay.textContent = "I'm afraid I can't do that";
        mainDisplay.style.opacity = "1";        
    },1800);
}

function formatDisplay(input) {

    const unformattedString = `${input}`;
    const decimalLocation = unformattedString.search(/\./);

    console.log( {unformattedString} );
    console.log( {decimalLocation });

    if (Number(unformattedString) >= 1e+16) {
        return Number(unformattedString).toExponential();
    } else {
        if (decimalLocation === -1) {
        return Intl.NumberFormat("en-GB").format(unformattedString);
        } else {
        return `${Intl.NumberFormat("en-GB",{ maximumFractionDigits: 0, roundingMode: "trunc" }).format(unformattedString)}${unformattedString.slice(decimalLocation)}`;
    }
}}
