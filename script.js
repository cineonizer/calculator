let inOperation = false;
let isDecimal = false;
let firstOperand;
let secondOperand;
let currentOperator;

const displayWindow = document.querySelector('.display p1');
const numberButton = document.querySelectorAll('.number-button');
const decimalButton = document.querySelector('.decimal-button');
const clearButton = document.querySelector('#clear');
const operatorButton = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');

function getOperand() {
    decimalButton.addEventListener('click', () => isDecimal = true);
    numberButton.forEach(numberButton => {
        numberButton.addEventListener('click', () => {
            if (!isDecimal) {
                if (displayWindow.textContent === '0.' || inOperation) {
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
        });
    });
}

function getOperator() {
    operatorButton.forEach(operatorButton => {
        operatorButton.addEventListener('click', () => {
            currentOperator = operatorButton.textContent;
            firstOperand = displayWindow.textContent;
            isDecimal = false;
            inOperation = true;
        });
    });

}

function evaluate() {
    equalsButton.addEventListener('click', () => {
        secondOperand = displayWindow.textContent;
        displayWindow.textContent = getResult(currentOperator, firstOperand, secondOperand);
    });
}







function getResult(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            let sum = a + b;
            if (Number.isInteger(sum)) {
                return displayWindow.textContent = sum + '.';
            }
            else {
                return sum;
            }
            break;
        case '−':
            let difference = a - b;
            if (Number.isInteger(difference)) {
                return displayWindow.textContent = difference + '.';
            }
            else {
                return difference;
            }
            break;
        case '×':
            return a * b;
            break;
        case '/':
            return a / b;
            break;
    };
}

function getClear() {
    clearButton.addEventListener('click', () => {
        reset();
    });
}

function reset() {
    displayWindow.textContent = '0.';
    inOperation = false;
    isDecimal = false;
    firstOperand = 0;
    secondOperand = 0;
}



getOperand();
getOperator();
getResult();
getClear();
evaluate();
