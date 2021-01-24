const displayWindow = document.querySelector('.display p1');
let isDecimal = false;
let operator;
let displayValue;
let firstValue;
let secondValue;

function getDisplay() {
    const numberButton = document.querySelectorAll('.number-button');
    const decimalButton = document.querySelector('.decimal-button');
    decimalButton.addEventListener('click', () => isDecimal = true);
    numberButton.forEach(numberButton => {
        numberButton.addEventListener('click', () => {
            if (!isDecimal) {
                if (displayWindow.textContent === '0.') {
                    displayWindow.textContent = numberButton.textContent;
                }
                else {
                    displayWindow.textContent = displayWindow.textContent.slice(0, -1);
                    displayWindow.textContent += numberButton.textContent;
                }
                displayWindow.textContent += '.';
            }
            else {
                displayWindow.textContent += numberButton.textContent;
            }
            displayValue = parseFloat(displayWindow.textContent);
        });
    });
}

function applyOperator() {
    const addButton = document.querySelector('#add');
    addButton.addEventListener('click', () => {
        if (!firstValue) {
            firstValue = displayValue;
            reset();
        }
        else {
            displayValue = parseFloat(displayWindow.textContent);
            firstValue += displayValue;
            displayWindow.textContent = firstValue;
        }
        operator = '+';
    });
}

function applyEquals() {
    const equalsButton = document.querySelector('.equals-button');
    equalsButton.addEventListener('click', () => {
        secondValue = displayValue;
        switch (operator) {
            case '+':
                let sum = firstValue + secondValue;
                if (Number.isInteger(sum)) {
                    displayWindow.textContent = firstValue + secondValue + '.';
                }
                break;
            case '-':
                return a - b;
                break;
            case '*':
                return a * b;
                break;
            case '/':
                return a / b;
                break;
        };
    });
}

function clearDisplay() {
    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', () => {
        reset();
        firstValue = 0;
        secondValue = 0;
    });
}

function reset() {
    displayWindow.textContent = '0.';
    isDecimal = false;
}

getDisplay();
applyOperator();
applyEquals();
clearDisplay();
