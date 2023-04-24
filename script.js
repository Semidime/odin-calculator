/* variables */
let displayValue = "0";
let operator = "";
let firstNumber = undefined;
let secondNumber = undefined;
let overwriteDV = 1;
let toggleAssignNumber = 0;
let UserDVInput = 0;

/* set initial mainDisplay */
const mainDisplay = document.getElementById('main-display');
const minorDisplay = document.getElementById('minor-display');
mainDisplay.textContent = 0;



/* event listeners */
/* 1. clear button - calls reset function*/
    const clrBtn = document.querySelector('#clear-button');
    clrBtn.addEventListener('click',function () {reset()});

/* 2. operator buttons*/
    const opBtns = document.querySelectorAll('.op-button');

    opBtns.forEach((opBtn) => {
        opBtn.addEventListener('click', () => {  

            /* remove formatting from prev. operator and apply to new operator */
            if(operator !== "") {removeSelected()};
            opBtn.classList.add('selected-op');   

            if(firstNumber !== undefined && UserDVInput == 1) {
                /* assign current DV to secondNumber variable and call operate BEFORE
                updating operator variable */
                assignSecondNumber();
                operate(); 
                
                /* assign new operator variable */
                operator = opBtn.textContent;
                
                /*  assign displayValue (i.e. result of operation) to firstNumber
                and set tAN to 0*/
                assignFirstNumber();
                toggleAssignNumber = 0;

                /* update display */
                mainDisplay.textContent = displayValue;
                minorDisplay.textContent = `${firstNumber} ${operator}`;                

            } else {
                /* assign new operator variable */
                operator = opBtn.textContent;
                
                /* assign current displayValue to firstNumber
                and set tAN to 0 */
                assignFirstNumber();
                toggleAssignNumber = 0;
                
                /* update display */
                mainDisplay.textContent = displayValue;
                minorDisplay.textContent = `${firstNumber} ${operator}`;
            }
        });
    });

/* 3. calc-digits - build displayValue */
const digitBtns = document.querySelectorAll('div.calc-digits button');

digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener('click', () => {
        if (overwriteDV === 1 && digitBtn.textContent === ".") {
            displayValue = "0.";
            overwriteDV = 0;
            UserDVInput = 1;
        } else if (digitBtn.textContent === "+/-") {
            displayValue = `${displayValue * -1}`;          
        } else if (overwriteDV === 1) {
            displayValue = digitBtn.textContent;
            overwriteDV = 0;
            UserDVInput = 1;
        } else if (digitBtn.textContent === "." && displayValue.search(/\./) != -1){
            return;
        } else {
            displayValue += digitBtn.textContent
        }
        mainDisplay.textContent = `${displayValue}`
    })
})

/* 4. equals button 
- assigns secondNumber variable (if toggleAssignNumber is 0) and calls operate()
- assigns firstNumber variable (if toggleAssignNumber is 1) and calls operate() */
    const eqlBtn = document.querySelector('#equals-button');
    
    eqlBtn.addEventListener('click', function () {
        if (toggleAssignNumber === 0) {
            assignSecondNumber();
            operate();
        } else {
            assignFirstNumber();
            operate();
        }
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
    minorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber} =`;

    /* set overwriteDV to 1
    set UserDVInput to 0*/
    overwriteDV = 1;
    UserDVInput = 0;
    /* set toggleAssignNumber to 1*/
    toggleAssignNumber = 1;

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
    overwriteDV = 1;
    UserDVInput = 0;
    toggleAssignNumber = 0;
    mainDisplay.textContent = `${displayValue}`;
    minorDisplay.textContent = "";
}

function removeSelected () {
    const selectedBtn = document.querySelector('.selected-op')
        selectedBtn.classList.remove('selected-op');
    }

function assignFirstNumber() {
    firstNumber = Number(displayValue);
    overwriteDV = 1;
    UserDVInput = 0;
}

function assignSecondNumber() {
    secondNumber = Number(displayValue);
    overwriteDV = 1;
    UserDVInput = 0;
}