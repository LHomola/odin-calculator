const MAX_LEN = 14;

let awaitingSecondNum = true;
let firstNum = "";
let operator = "";
let periodCount = 0;
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
        return "From hero to zero!";
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
    periodCount = 0;
    secondNum = "";
}

// call one of calculation function based on operator
function operate() {    
    switch (operator) {
        case "+":            
            firstNum = add();
            break;
        case "-":
            firstNum = subtract();
            break;
        case "x":
            firstNum = multiply();
            break;
        case "÷":
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
    periodCount = 0;
    secondNum = "";
}

function attachEventListenerBackspace() {
    const backspaceBtn = document.querySelector("#backspace-key");
    const display = document.querySelector(".calculator-display");    

    backspaceBtn.addEventListener("click", () => display.textContent = display.textContent.slice(0, -1));
}

function attachEventListenerClear() {
    const clearBtn = document.querySelector("#clear-key");
    
    clearBtn.addEventListener("click", () => fullReset());
}

function attachEventListenerPeriod() {
    const display = document.querySelector(".calculator-display");
    const key = document.querySelector("#period-key");    
    
    key.addEventListener("click", () => {
        if (awaitingSecondNum || display.textContent === "") {
            display.textContent = "0"; // if last key pressed was an operator prepend zero to display string
            awaitingSecondNum = false;
        }

        console.log(periodCount);
        if (display.textContent.length < MAX_LEN && periodCount < 1) {
            console.log("test");
            periodCount++;
            display.textContent += key.textContent;
        }
    });
}
    
function attachEventListenersNumbers() {
    const display = document.querySelector(".calculator-display");
    const keys = document.querySelectorAll(".number-key");    

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (awaitingSecondNum) {
                display.textContent = ""; // if last key pressed was an operator clear the display
                awaitingSecondNum = false;
            }

            if (display.textContent.length < MAX_LEN) {
                display.textContent += key.textContent;
            }
        })
    });
}

function attachEventListenersOperators() {    
    const display = document.querySelector(".calculator-display");
    const keys = document.querySelectorAll(".operator-key");

    // operator button clicked -> if first operation store displayed value else perform calculation and clear display
    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (key.textContent === "√") { // if square root, no need to wait for second number
                firstNum = display.textContent
                operator = key.textContent;                
                operate();
            } else {
                if (firstNum === "") { // if starting a whole new calculation
                    firstNum = display.textContent;
                } else if (!awaitingSecondNum) { // if first number, operator AND second number have been entereed calculate
                    secondNum = display.textContent;
                    operate();
                }
                
                awaitingSecondNum = true;
                operator = key.textContent;                
            }
        })
    });
}

function attachEventListenerEquals() {    
    const display = document.querySelector(".calculator-display");
    const equalsBtn = document.querySelector("#equals-key");

    equalsBtn.addEventListener("click", () => {
        // if number and operator have been provided and current display content is a number -> calculate
        if (firstNum !== "" && operator !== "" && !isNaN(display.textContent)) {
            secondNum = display.textContent;
            operate();

            awaitingSecondNum = true;
        }
    })
}

attachEventListenerBackspace();
attachEventListenerClear();
attachEventListenerEquals();
attachEventListenersNumbers();
attachEventListenersOperators();
attachEventListenerPeriod();