const MAX_LEN = 14;

let awaitingSecondNum = true;
let firstNum = "";
let operator = "";
let decimalCount = 0;
let secondNum = "";

function add() {
    return parseFloat(firstNum) + parseFloat(secondNum);
}

function subtract() {
    return parseFloat(firstNum) - parseFloat(secondNum);
}

function multiply() {
    return parseFloat(firstNum) * parseFloat(secondNum);
}

function divide() {
    if (secondNum !== "0") {
        return parseFloat(firstNum) / parseFloat(secondNum)
     } else {
        return "From hero to zero!"; // division by zero message to user
     }
}

function squareRoot() {
    return Math.sqrt(parseFloat(firstNum));
}

// once operation has been performed, update display and reset everything except firstNum
function postOperationReset() {
    const display = document.querySelector(".calculator-display");            

    display.textContent = firstNum;
    operator = "";
    decimalCount = 0;
    secondNum = "";
}

// call one of calculation functions based on operator
function operate() {    
    switch (operator) {
        case "+":            
            firstNum = add();
            break;
        case "-":
            firstNum = subtract();
            break;
        case "x" :
        case "*" :
            firstNum = multiply();
            break;
        case "÷":
        case "/":
            firstNum = divide();
            break;
        case "√":
            firstNum = squareRoot();
            break;
        default:
            alert ("Invalid choice");
            break;
    }

    firstNum = Number(Number(firstNum).toPrecision(MAX_LEN));
    postOperationReset();
}

function fullReset() {
    const display = document.querySelector(".calculator-display");

    display.textContent = "";
    firstNum = "";
    operator = "";
    decimalCount = 0;
    secondNum = "";
}

function backspaceEventReaction() {
    const display = document.querySelector(".calculator-display");    
    display.textContent = display.textContent.slice(0, -1);
}

function attachMouseEventListenerBackspace() {
    const backspaceBtn = document.querySelector("#backspace-key");    
    backspaceBtn.addEventListener("click", () => backspaceEventReaction());
}

function attachMouseEventListenerClear() {
    const clearBtn = document.querySelector("#clear-key");
    
    clearBtn.addEventListener("click", () => fullReset());
}

function decimalEventReaction() {
    const display = document.querySelector(".calculator-display");
    
    if (awaitingSecondNum || display.textContent === "") {
        display.textContent = "0"; // if last key pressed was an operator prepend zero to display string
        awaitingSecondNum = false;
    };

    if (display.textContent.length < MAX_LEN && decimalCount < 1) {
        decimalCount++;
        display.textContent += ".";
    };
}

function attachMouseEventListenerDecimal() {
    const key = document.querySelector("#decimal-key");
    key.addEventListener("click", () => decimalEventReaction());
}

function operatorEventReaction(e, key) {    
    const display = document.querySelector(".calculator-display");
    
    if ((e.shiftKey && key === "/") || (key === "√")) { // if square root, no need to wait for second number
        firstNum = display.textContent
        operator = key;
        operate();
    } else { // other operators
        if (firstNum === "") { // if starting a whole new calculation
            firstNum = display.textContent;
        } else if (!awaitingSecondNum) { // if first number, operator AND second number have been entereed calculate
            secondNum = display.textContent;
            operate();
        }
        
        awaitingSecondNum = true;
        operator = key;
        decimalCount = 0;
    };            
}

function attachMouseEventListenersOperators() {    
    const keys = document.querySelectorAll(".operator-key");

    keys.forEach(key => {
        key.addEventListener("click", (e) => operatorEventReaction(e, key.textContent));
    });
}

function equalsEventReaction() {    
    const display = document.querySelector(".calculator-display");

    // if number and operator have been provided and current display content is a number -> calculate
    if (firstNum !== "" && operator !== "" && !isNaN(display.textContent)) {
        secondNum = display.textContent;
        operate();

        awaitingSecondNum = true;
    }
}

function attachMouseEventListenerEquals() {    
    const equalsBtn = document.querySelector("#equals-key");
    equalsBtn.addEventListener("click", () => equalsEventReaction());
}

function numberEventReaction(key) {    
    const display = document.querySelector(".calculator-display");

    if (awaitingSecondNum) {
        display.textContent = ""; // if last key pressed was an operator clear the display
        awaitingSecondNum = false;
    }

    if (display.textContent.length < MAX_LEN) {
        display.textContent += key;
    }
}

function attachMouseEventListenersNumbers() {    
    const keys = document.querySelectorAll(".number-key");    

    keys.forEach(key => {
        key.addEventListener("click", () => numberEventReaction(parseInt(key.textContent)));
    });
}

function attachKeyboardEventListenersNumbers() {
    window.addEventListener("keydown", (e) => {
        const key = e.key;

        // numbers
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(key)) numberEventReaction(key);
        
        // operators
        if (["+", "-", "*", "/"].includes(key)) {
            e.preventDefault(); // "/" triggers search function in firefox -> prevent this behaviour                        
            operatorEventReaction(e, key);
        };
        
        // functional keys
        switch (key) {
            case "Escape":
                fullReset();
                break;        
            case "Backspace":
                backspaceEventReaction();
                break;
            case "Enter":
                equalsEventReaction();
                break;
            case ".":
                decimalEventReaction();
                break;
            default:
                break;
        }        
    });
}

attachMouseEventListenerBackspace();
attachMouseEventListenerClear();
attachMouseEventListenerEquals();
attachMouseEventListenersNumbers();
attachMouseEventListenersOperators();
attachMouseEventListenerDecimal();

attachKeyboardEventListenersNumbers();