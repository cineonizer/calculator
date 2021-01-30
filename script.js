let isDecimal = false;
let isEqual = false;
let resetToggle = false;
let currentOperator = '';
let firstOperand = 0;
let secondOperand = 0;
let result = 0;
let decimals = 0;

const displayWindow = document.querySelector('.display p1');
const numberButton = document.querySelectorAll('.number-button');
const decimalButton = document.querySelector('.decimal-button');
const clearButton = document.querySelector('#clear');
const clearEntryButton = document.querySelector('#clear-entry');
const operatorButton = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('.equals-button');
const radicalButton = document.querySelector('#radical');
const transferDisplayButton = document.querySelector('.transfer-display');
const plusOrMinusButton = document.querySelector('#plusmn');

decimalButton.addEventListener('click', () => isDecimal = true);
clearButton.addEventListener('click', clear);
clearEntryButton.addEventListener('click', clearEntry);
radicalButton.addEventListener('click', getRadical);
equalsButton.addEventListener('click', getResult);
numberButton.forEach(numberButton => {
    numberButton.addEventListener('click', () => getOperand(numberButton.textContent));
});
operatorButton.forEach(operatorButton => {
    operatorButton.addEventListener('click', () => getOperator(operatorButton.textContent));
});
transferDisplayButton.addEventListener('click', copyToClipboard);
plusOrMinusButton.addEventListener('click', getPlusOrMinus);

function getOperand(number) {
    if (resetToggle || isEqual) reset();
    if (displayWindow.textContent.length === 12) return;
    if (!isDecimal) {
        if (displayWindow.textContent === '0.') displayWindow.textContent = number;
        else {
            displayWindow.textContent = displayWindow.textContent.slice(0, -1);
            displayWindow.textContent += number;
        }
        displayWindow.textContent += '.';
    }
    else displayWindow.textContent += number;
}

function getOperator(operator) {
    if (currentOperator) getResult();
    currentOperator = operator;
    firstOperand = displayWindow.textContent;
    resetToggle = true;
}

function getResult() {
    if (!currentOperator || resetToggle) return;
    secondOperand = displayWindow.textContent;
    decimals = getDecimals(firstOperand, secondOperand);
    result = operate(currentOperator, firstOperand, secondOperand);
    if (currentOperator === '+' || currentOperator === '-')
        result = Number.isInteger(result) ? result : result.toFixed(decimals); 
    displayWindow.textContent = Number.isInteger(result) ? result + '.' : result;
    currentOperator = '';
    isEqual = true;
}

function getDecimals() {
    return firstOperand.split('.')[1].length > secondOperand.split('.')[1].length ? 
        firstOperand.split('.')[1].length : secondOperand.split('.')[1].length;
}

function reset() {
    displayWindow.textContent = '';
    resetToggle = false;
    isDecimal = false;
    isPlusMinus = false;
    isEqual = false;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '−':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) return "don't do that";
            return a / b;
    };
}

function getPlusOrMinus() {
    if (displayWindow.textContent === '0.' || resetToggle) return;
    if (displayWindow.textContent.includes('-')) displayWindow.textContent = 
        displayWindow.textContent.slice(1);
    else displayWindow.textContent = '-' + displayWindow.textContent;
}

function getRadical() {
    if (displayWindow.textContent === '0.') return
    result = Math.sqrt(displayWindow.textContent);
    result = Number.isInteger(result) ? result : result.toFixed(10);
    displayWindow.textContent = Number.isInteger(result) ? result + '.' : result;
}
                 
function copyToClipboard() {
    navigator.clipboard.writeText(parseFloat(displayWindow.textContent));
    transferDisplayButton.textContent = 'Copied!';
    setTimeout(() => transferDisplayButton.textContent = 'Transfer Display', 1000);
}

function clear() {
    displayWindow.textContent = '0.';
    firstOperand = 0;
    secondOperand = 0;
    currentOperator = '';
    isDecimal = false;
}

function clearEntry() {
    displayWindow.textContent = '0.';
    isDecimal = false;
}

