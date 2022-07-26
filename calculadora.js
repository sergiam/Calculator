const display = document.getElementById("display");
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
        display.value = "0."
    }
    else if (!operatorOn && (num1 === undefined || num1 == "")) {
        display.value=nums;
        num1 = display.value;
        operationResult = null;
        console.log(num1);
    } else if(!operatorOn) {
        if (num1.length > 9) {
            return;
        }
        display.value+=nums;
        num1 = display.value;
        console.log(num1);
    } else if (operatorOn && (num2 === undefined || num2 == "")){
        display.value=nums;
        num2 = display.value;
        console.log(num2);
    } else {
        if (num2.length > 9) {
            return;
        }
        display.value+=nums;
        num2 = display.value;
        console.log(num2);
    }
}

//Cambiar nombres de variables para que sean coherentes
//Almacena el signo de la operación (+,-,*,/)
function operation(sign) {
    if (operator != null) {
        operator.style.backgroundColor='#d1d1d1';
    } 
    sign.style.backgroundColor='#ff0000';
    operatorOn = true;
    operator = sign;
    console.log(operator);
}

function calc(){
    var result;
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

function roundResult(){
   
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

function newOperation() {
    console.log('nueva operacion');
    num1 = operationResult;
    operationResult = calc();
    if (operationResult.toString().includes('.')){
    roundResult();
    }
    display.value = operationResult;
    
    
}

function buttonEqual(){
    if (operationResult == null) {
    operationResult = calc();
    console.log(operationResult);
    if (isNaN(operationResult)) {
        result = display.value = 'ERROR';
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
} else {
        newOperation();
    }

    reset();
}

//Función reseteo calculadora
function reset(){
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
function changeSign() {
    var x = display.value;
    var resul = -x;
    display.value = resul;
}

function buttonClear(){
    display.value = "";
    reset();
}

function buttonDeleteOneNumber(){
    var num = display.value;
    num = num.substring(0, num.length - 1);
    display.value = num;
    num1 = num;
}
/*
function takeValue(x){
    if (x == "," && document.getElementById('display').value == 0)
    {
        document.getElementById("display").value = "0,";
    } else {
        document.getElementById("display").value += x;
    }
}


function buttonDeleteOneNumber(x){
    removeHighlight();
    document.getElementById('display').value = x;
}

*/

function teclado (event) { 
    event.preventDefault();
    events = event || window.event;
    k=events.keyCode; 
  
    if (k>47 && k<58) { 
       p=k-48; 
       p=String(p)
       add(p);
       }	

    if (k>95 && k<106) {
       p=k-96;
       p=String(p);
       add(p);
       }
    if (k==88) {operation('*')} //tecla multiplicación
    if (k==107) {operation('+')} //tecla suma
    if (k==109) {operation('-')} //tecla resta
    if (k==111) {operation('/')} //tecla división
    if (k==188) {add('.')}
    if (k==106) {operation('*')}
    if (k==189) {operation('-')}
    if (k==17) {changeSign()}
    if (k==13) {calc()} //Tecla igual: intro
    if (k==27) {buttonClear()} //Tecla borrado total: "esc"
    if (k==8) {buttonDeleteOneNumber()} //Retroceso en escritura : tecla retroceso.
    }
    
