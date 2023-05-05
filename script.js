let displayValue = "0";
let operator = "";
let firstNumber = undefined;
let secondNumber = undefined;
let overwriteDV = 1;
let toggleAssignNumber = 0;
let userDVInput = 0;
let userEqlsInput = 0;

const mainDisplay = document.getElementById('main-display');
const minorDisplay1 = document.getElementById('minor-display1');
const minorDisplay2 = document.getElementById('minor-display2');
mainDisplay.textContent = 0;

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

	} else if (displayValue.replaceAll(/[-.]/g,"").length >= 13) {
        return;

    } else {
        displayValue += digit;
    }

    mainDisplay.textContent = `${formatDisplay(displayValue)}`
}

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

function assignOperator(opSymbol) {
    if (operator !== "") {removeSelected()};
    if (opSymbol === "+") {document.getElementById("add").classList.add('selected-op')};
    if (opSymbol === "-") {document.getElementById("subtract").classList.add('selected-op')};
    if (opSymbol === "*") {document.getElementById("multiply").classList.add('selected-op')};
    if (opSymbol === "/") {document.getElementById("divide").classList.add('selected-op')};

    if (firstNumber !== undefined && userDVInput == 1 && userEqlsInput !== 1) {
       /* assign current displayValue to secondNumber variable and call operate BEFORE
       updating operator variable */
       assignSecondNumber();
       operate(); 
       
       operator = opSymbol;
       assignFirstNumber();
       toggleAssignNumber = 0;
       userEqlsInput = 0;

       mainDisplay.textContent = `${formatDisplay(displayValue)}`;
       minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`;
       minorDisplay2.textContent = "";                

   } else {
       operator = opSymbol;
       assignFirstNumber();
       toggleAssignNumber = 0;
       userEqlsInput = 0;
       
       mainDisplay.textContent = `${formatDisplay(displayValue)}`;
       minorDisplay1.textContent = `${formatDisplay(firstNumber)} ${operator}`;
       minorDisplay2.textContent = "";   
   }
}

function operate() {
    const a = firstNumber;
    const b = secondNumber;


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

    overwriteDV = 1;
    userDVInput = 0;
    toggleAssignNumber = 1;
}

function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) { 
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function assignFirstNumber() {
    firstNumber = Number(displayValue);
    overwriteDV = 1;
    userDVInput = 0;
}

function assignSecondNumber() {
    secondNumber = Number(displayValue);
    overwriteDV = 1;
    userDVInput = 0;
}

function formatDisplay(input) {
    const unformattedString = `${input}`;
    const decimalLocation = unformattedString.search(/\./);

    if (Number(unformattedString) >= 1e+13 || Number(unformattedString) <= -1e+13)  {
        return Number(unformattedString).toExponential(7);
    } else {
        if (decimalLocation === -1) {
        return Intl.NumberFormat("en-GB").format(unformattedString);
        } else {
        return `${Intl.NumberFormat("en-GB",{ maximumFractionDigits: 0, roundingMode: "trunc" }).format(unformattedString)}${unformattedString.slice(decimalLocation)}`;
        }
    }
}

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

/* Mouse inputs */
/* 1. calc-digits*/
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

/* 4. clear button */
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

/* 5. delete (Backspace OR Delete key) */
    } else if (event.key === "Backspace" || event.key === "Delete" ) {
        backspace();
    
    /* exit if any other key pressed */    
    } else {   
        return
    };
});