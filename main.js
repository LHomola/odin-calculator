let firstNum = "";
let newNumber = false;
let operator = "";
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
    return parseFloat(firstNum) / parseFloat(secondNum);
}

// call one of calculation function based on operator
function operate(operator) {
    const display = document.querySelector(".calculator-display");            

    switch (operator) {
        case "+":            
            firstNum = add();
            display.textContent = firstNum;    
            break;
        case "-":
            firstNum = subtract();
            display.textContent = firstNum;    
            break;
        case "x":
            firstNum = multiply();
            display.textContent = firstNum;    
            break;
        case "÷":
            firstNum = divide();
            display.textContent = firstNum;    
            break;    
        default:
            alert ("Invalid choice");
            break;
    }
}

function clearDisplay() {
    const display = document.querySelector(".calculator-display");
    display.textContent = "";
    firstNum = "";
    secondNum = "";
}

function attachEventListenerClear() {
    const clearBtn = document.querySelector("#clear-key");
    clearBtn.addEventListener("click", () => clearDisplay());
}
    
function attachEventListenersNumbers() {
    const keys = document.querySelectorAll(".number-key");
    const display = document.querySelector(".calculator-display");

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (newNumber) {
                display.textContent = ""; // if last key pressed was an operator clear the display
                newNumber = false;
            }

            if (display.textContent.length < 15) {
                display.textContent += key.textContent;
            }
        })
    });
}

function attachEventListenersOperators() {
    const keys = document.querySelectorAll(".operator-key");    
    const display = document.querySelector(".calculator-display");

    // operator button clicked -> if first operation store displayed value else perform calculation and clear display
    keys.forEach(key => {
        key.addEventListener("click", () => {
            firstNum === "" ? firstNum = display.textContent : secondNum = display.textContent;                       

            if (secondNum !== "") operate(operator);
            
            newNumber = true;
            operator = key.textContent;
        })
    });
}

attachEventListenerClear();
attachEventListenersNumbers();
attachEventListenersOperators();