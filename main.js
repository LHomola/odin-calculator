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

function squareRoot() {
    return Math.sqrt(parseFloat(firstNum));
}

// call one of calculation function based on operator
function operate(operator) {
    const display = document.querySelector(".calculator-display");            

    switch (operator) {
        case "+":            
            firstNum = add();
            display.textContent = firstNum;
            secondNum = "";
            break;
        case "-":
            firstNum = subtract();
            display.textContent = firstNum;
            secondNum = "";
            break;
        case "x":
            firstNum = multiply();
            display.textContent = firstNum;
            secondNum = "";
            break;
        case "÷":
            firstNum = divide();
            display.textContent = firstNum;
            secondNum = "";
            break;
        case "√":
            firstNum = squareRoot();
            display.textContent = firstNum;
            secondNum = "";
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
            if (key.textContent === "√") {
                firstNum = display.textContent
                operator = key.textContent;                
                operate(operator);
            } else {
                firstNum === "" ? firstNum = display.textContent : secondNum = display.textContent;
                if (secondNum !== "") operate(operator);
                
                operator = key.textContent;
                newNumber = true;
            }
        })
    });
}

attachEventListenerClear();
attachEventListenersNumbers();
attachEventListenersOperators();