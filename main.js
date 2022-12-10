const numberButtons = document.querySelectorAll('#data-number')
const operationButtons = document.querySelectorAll('#data-operator')
const equalsButton = document.querySelector('#data-equals')
const deleteButton = document.querySelector('#data-delete')
const allClearButton = document.querySelector('#data-clear')
const mainDisplayCurrent = document.querySelector('#data-display-current');
const mainDisplayPrev = document.querySelector('#data-display-previous');
let calcArray = [];
let currentOperand = '';
let previousOperand = '';
let operation = undefined;
const operatorsArray = ['-', '+', '/', '*'];

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendOperand(button.innerText)
        updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText)
        updateDisplay()
    })
  })
  
equalsButton.addEventListener('click', button => {
    compute()
    updateDisplay()
})

window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[value='${e.key}']`);
    if(key) key.click();
});

allClearButton.addEventListener('click', button => {
    clear()
    updateDisplay()
})

deleteButton.addEventListener('click', button => {
    deleteKey()
    updateDisplay()
})

function appendOperand(operand) {
    if (operand == '.' && currentOperand.toString().includes('.')) return
    currentOperand = currentOperand.toString() + operand.toString()
    if(previousOperand==''){
        compute()
    }
}

function updateDisplay() {
    mainDisplayCurrent.innerText =
        getDisplayNumber(currentOperand)
    if (operation != null) {
        mainDisplayPrev.innerText =
        `${getDisplayNumber(previousOperand)} ${operation}`
    } else {
        mainDisplayPrev.innerText = ''
    }
}


function getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if(number=='zero-division') {
        clear();
        return `division by zero!!`
    }
    if (isNaN(integerDigits)) {
        integerDisplay = ''
    } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
  }

function chooseOperation(x) {
    if(currentOperand == '' && previousOperand!='' && operation==''){
        currentOperand=previousOperand
    }

    if (currentOperand == '' && x!='-') return
    if (previousOperand !== '') {
        compute()
    }
    operation = x
    previousOperand = currentOperand
    currentOperand = ''
  }

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function compute() {
    let computation = 0;
    const previous = parseFloat(previousOperand) || parseFloat(0.000)
    const current = parseFloat(currentOperand)
    if (isNaN(previous) || isNaN(current)) return
    switch (operation) {
        case '+':
        computation = previous + current
        break
        case '-':
        computation = previous - current
        break
        case '*':
        computation = previous * current
        break
        case '/':
        computation = current == 0 ? NaN : previous / current
        break
        default:
        return
    }
    currentOperand = isNaN(computation) ? 'zero-division' : (Number(computation) == computation && computation % 1 != 0) ? computation.toFixed(3) : computation
    operation = undefined
    previousOperand = ''
}

function deleteKey() {
    if(mainDisplayCurrent.innerText) {
        currentOperand = currentOperand.toString().slice(0, -1)
    } else if (operatorsArray.includes(mainDisplayPrev.innerText.slice(-1))){
        operation = ''
    } else {
        previousOperand =previousOperand.toString().slice(0,-1)
    }
}