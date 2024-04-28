let firstNum = 0;
let secondNum = 0;
let operator = "";

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;    
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// call one of calculation function based on operator
function operate(a, b, operator) {
    switch (operator) {
        case "+":
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break;    
        default:
            alert ("Invalid choice");
            break;
    }
}

function clearDisplay() {
    const display = document.querySelector(".calculator-display");
    display.textContent = "";
}

function attachEventListenersClear() {
    const clearBtn = document.querySelector("#clear-key");
    clearBtn.addEventListener("click", () => clearDisplay());
}
    
function attachEventListenersNumbers() {
    const keys = document.querySelectorAll(".number-key");    
    const display = document.querySelector(".calculator-display");

    keys.forEach(key => {
        key.addEventListener("click", () => {
            if (display.textContent.length < 15) {
                firstNum = firstNum * 10 + parseInt(key.textContent);
                display.textContent = firstNum;
            }
        })
    });
}

attachEventListenersNumbers();
attachEventListenersClear();