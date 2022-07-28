const display = document.getElementById("display");
const operatorButtons = document.querySelectorAll('.operators');
const numberButtons = document.querySelectorAll('.numbers');
var operatorOn = false;
var num1;
var num2;
var operator;
var operationResult;

window.onload = function(){ //Acciones tras cargar la página
    pantalla=display; //elemento pantalla de salida
    window.addEventListener('keydown',teclado);
}

//Añade los números correspondientes a la calculadora
function add(nums)
{	
    if (nums == "." && display.value == 0) {
        display.value += "0.";
        num1 = display.value;
    }
    else if (!operatorOn && (num1 === undefined || num1 == "")) {
        display.value=nums;
        num1 = display.value;
        operationResult = null;
        console.log(num1);
    } 
    else if(!operatorOn) {
        if (num1.length > 9) {
            buttonDisabled();
            return;
        }
        display.value+=nums;
        num1 = display.value;
        console.log(num1);
    } 
    else if (operatorOn && (num2 === undefined || num2 == "")){
        display.value=nums;
        num2 = display.value;
        console.log(num2);
    } 
    else {
        if (num2.length > 9) {
            buttonDisabled();
            return;
        }
        display.value+=nums;
        num2 = display.value;
        console.log(num2);
    }
}

//Cambiar nombres de variables para que sean coherentes
//Almacena el signo de la operación (+,-,*,/)
function operation(sign) 
{
    if (operator != null) {
        operator.style.backgroundColor='#d1d1d1';
    } 
    sign.style.backgroundColor='#ff0000';
    operatorOn = true;
    operator = sign;
    buttonEnable();
    console.log(operator);
}

function calc()
{
    var result;
    if (operator == null && display.value == 0) {
        display.value = 0;
    }
		if (operator.value == '*') {
           result = parseFloat(num1) * parseFloat(num2);
           console.log(operator.value)
            return result;

        } else if (operator.value == '+') {
            result = parseFloat(num1) + parseFloat(num2);
            console.log(operator.value)
            return result;
        
        } else if (operator.value == '-') {
            result = parseFloat(num1) - parseFloat(num2);
            console.log(operator.value)
            return result;
            
        } else if (operator.value == '/' && num2 == '0'){
            console.log('error');
            result = display.value = 'ERROR';
            return result;

        } else if (operator.value == '/') {
            result = parseFloat(num1) / parseFloat(num2);
            console.log(operator.value)
            return result;
            
        } 
} 

function roundResult()
{
    var numToString;
    var isDecimal = false;
    var integerText = '';
    var decimalText = '0.';
    
    numToString = operationResult.toString(); 
    
    for(i = 0; i < numToString.length; i++) {
        
        if (numToString[i] == '.'){
            isDecimal = true;
        } else if (!isDecimal) {
            integerText = integerText + numToString[i];
        
        } else if (isDecimal){
            decimalText = decimalText + numToString[i];
        }
    } 
    decimalText = parseFloat(decimalText).toFixed(10 - integerText.length);
    operationResult = parseFloat(integerText) + parseFloat(decimalText);
}

function newOperation() 
{
    console.log('nueva operacion');
    num1 = operationResult;
    operationResult = calc();
    if (operationResult.toString().includes('.')){
    roundResult();
    }
    buttonDisabled();
    display.value = operationResult;
}

function buttonEqual()
{
    if (operationResult == null) {
    operationResult = calc();
    console.log(operationResult);
    if (isNaN(operationResult)) {
        display.value = 'ERROR';
    } else if (operationResult > 9999999999 || operationResult < -9999999999) {
        display.value = 'ERROR';
    } 
    else {
        if (operationResult.toString().includes('.')){
        roundResult();
        }
        display.value = operationResult;
    }
    if (operator != null){ 
        operator.style.backgroundColor = '#d1d1d1';
        operator = null;
    }
    operator = null;
    buttonEnable();
} else {
        newOperation();
    }

    reset();
}

//Función reseteo calculadora
function reset()
{
    console.log(operator);
    if (operator != null){ 
        operator.style.backgroundColor = '#d1d1d1';
        operator = null;
    }
    num1 = "";
    num2 = "";
    operatorOn = false;
}

// Cambia signo a positivo o negativo
function changeSign() 
{
    var x = display.value;
    var resul = -x;
    display.value = resul;
}

function buttonClear()
{
    display.value = "";
    buttonEnable();
    reset();
}

function buttonDeleteOneNumber()
{
    var num = display.value;
    num = num.substring(0, num.length - 1);
    display.value = num;
    num1 = num;
}


function buttonDisabled() {
    if (display.value.length > 9) {
        numberButtons.forEach (numberButton => numberButton.disabled = true)
        numberButtons.forEach (numberButton => numberButton.classList.add('buttonDisabled'))
        document.querySelector('.zero').disabled = true;
        document.querySelector('.zero').classList.add('buttonDisabled')
    } 
}

function buttonEnable(){
    numberButtons.forEach (numberButton => numberButton.classList.remove('buttonDisabled'))
    numberButtons.forEach (numberButton => numberButton.disabled = false)
    document.querySelector('.zero').disabled = false;
    document.querySelector('.zero').classList.remove('buttonDisabled')
}

function teclado (event) 
{ 
    event.preventDefault();
    events = event || window.event;
    k=events.key; 
  
    if (k == 1) add(k);
    if (k == 2) add(k);
    if (k == 3) add(k);
    if (k == 4) add(k);
    if (k == 5) add(k);
    if (k == 6) add(k);
    if (k == 7) add(k);
    if (k == 8) add(k);
    if (k == 9) add(k);
    if (k == 0) add(k);
    if (k == '+') {operatorButtons.forEach (operatorButton => {if (operatorButton.value == '+') operation(operatorButton)})};
    if (k == '-') {operatorButtons.forEach (operatorButton => {if (operatorButton.value == '-') operation(operatorButton)})};
    if (k == '*') {operatorButtons.forEach (operatorButton => {if (operatorButton.value == '*') operation(operatorButton)})};
    if (k == '/') {operatorButtons.forEach (operatorButton => {if (operatorButton.value == '/') operation(operatorButton)})};
    if (k == ',' || k == '.') {add('.')}
    if (k == 'Control') {changeSign()}
    if (k == 'Enter') {buttonEqual()} //Tecla igual: intro
    if (k == 'Escape') {buttonClear()} //Tecla borrado total: "esc"
    if (k == 'Backspace') {buttonDeleteOneNumber()} //Retroceso en escritura : tecla retroceso.
}
    
