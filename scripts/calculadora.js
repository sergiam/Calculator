const display = document.getElementById("display");
const operatorButtons = document.querySelectorAll('.operators');
const numberButtons = document.querySelectorAll('.numbers');
var operatorOn = false;
var num1;
var num2;
var operator;
var operationResult;

//Cambiar nombres de variables para que sean coherentes

window.onload = function(){ //Acciones tras cargar la página
    pantalla = display; //elemento pantalla de salida
    window.addEventListener('keydown',teclado); // Función teclado
}

//Añade los números correspondientes a la calculadora
function add(nums)
{	
    if (display.value == 0 && nums == 0) {
        return;    
    }
    else if (nums == "," && display.value == 0) {
        display.value = "0,";
        num1 = display.value;
    
    }
    else if (display.value.includes(",") && nums == ",") {
        return;
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


//Almacena el signo de la operación y establece el estilo (+,-,*,/)
function operation(sign)
{
    if (operator != null) {
        operator.style.backgroundColor='#d1d1d1';
    } 
    sign.style.backgroundColor='#ff0000';
    if (operator != null) {
        operationResult = calc();
        operator = sign
        num1 = operationResult.toString(); 
        num2 = "";
        operationResult = null;
    }
    operatorOn = true;
    operator = sign;
    buttonEnable();
    console.log(operator);
}

// Función de cálculo
function calc()
{
    var result;
    if (operator == null && display.value == 0) {
        display.value = 0;
    }
		if (operator.value == '*') {
           result = parseFloat(num1.replace(',','.')) * parseFloat(num2.replace(',','.'));
           console.log(operator.value)
            return result;

        } else if (operator.value == '+') {
            result = parseFloat(num1.toString().replace(',','.')) + parseFloat(num2.toString().replace(',','.'));
            console.log(result);
            console.log(operator.value)
            return result;
        
        } else if (operator.value == '-') {
            result = parseFloat(num1.replace(',','.')) - parseFloat(num2.replace(',','.'));
            console.log(operator.value)
            return result;
            
        } else if (operator.value == '/' && num2 == '0'){
            console.log('error');
            result = display.value = 'ERROR';
            disabledBecauseError();
            return result;

        } else if (operator.value == '/') {
            result = parseFloat(num1.replace(',','.')) / parseFloat(num2.replace(',','.'));
            console.log(operator.value)
            return result;
            
        } else if (operatorOn && num2 == null) {
            display.value = num1;
        }
} 

// Redondea el resultado si es necesario
function roundResult()
{
    var numToString;
    var isDecimal = false;
    var integerText = '';
    var decimalText = '0,';
    
    numToString = operationResult.toString(); 
    console.log(numToString);
    
    for(i = 0; i < numToString.length; i++) {
        
        if (numToString[i] == ','){
            isDecimal = true;
        } else if (!isDecimal) {
            integerText = integerText + numToString[i];
        
        } else if (isDecimal){
            decimalText = decimalText + numToString[i];
        }
    } 
    console.log(integerText.length);
    decimalText = parseFloat(decimalText).toFixed(10).replace(',','.');
    console.log(decimalText);
    operationResult = parseFloat(integerText) + parseFloat(decimalText);
}


// Función que permite hacer una segunda operación
function newOperation() 
{
    console.log('nueva operacion');
    num1 = operationResult;
    operationResult = calc();
    if (operationResult.toString().includes(',')){
    roundResult();
    }
  
    display.value = operationResult;
}

// Función que determina que hace el botón de calcular
function buttonEqual()
{
    if (operationResult == null) {
    operationResult = calc();
    console.log(operationResult);
    if (isNaN(operationResult)) {
        display.value = 'ERROR';

        disabledBecauseError();

    } else if (operationResult > 9999999999 || operationResult < -9999999999) {
        display.value = 'ERROR';
        disabledBecauseError();
    } 
    else {
        if (operationResult.toString().includes('.')){
            console.log('pepe')
        roundResult();
        }
        display.value = operationResult;
        buttonEnable();
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

    var resul = display.value;
    console.log(typeof(display.value))
   
    if (resul[0] == "-") {
        resul = resul.substring(1,resul.length);
        console.log(resul);
    }
    
    else {
        if(display.value == 0 || display.value == "0,") {
            return;
        }

        resul = "-" + resul;
    }
    display.value = resul;
    

  
}

// Función de limpieza de operación
function buttonClear()
{
    display.value = 0;
    buttonEnable();
    reset();
}

// Función que borra el último parámetro del número introducido
function buttonDeleteOneNumber()
{
    var num = display.value;
    num = num.substring(0, num.length - 1);
    display.value = num;
    num1 = num;
}

// Función que deshabilita los botones
function buttonDisabled() {
        numberButtons.forEach (numberButton => numberButton.disabled = true)
        numberButtons.forEach (numberButton => numberButton.classList.add('buttonDisabled'))
        document.querySelector('.zero').disabled = true;
        document.querySelector('.zero').classList.add('buttonDisabled')
}

// Función que habilita los botones
function buttonEnable(){
    numberButtons.forEach (numberButton => numberButton.classList.remove('buttonDisabled'))
    numberButtons.forEach (numberButton => numberButton.disabled = false)
    document.querySelector('.zero').disabled = false;
    document.querySelector('.zero').classList.remove('buttonDisabled');
    operatorButtons.forEach (operatorButton => operatorButton.classList.remove('buttonDisabled'))
    operatorButtons.forEach (operatorButton => operatorButton.disabled = false)
}

function disabledBecauseError(){
    buttonDisabled();
    operatorButtons.forEach (operatorButton => {if (operatorButton.value != 'borrado') operatorButton.disabled = true});
    operatorButtons.forEach (operatorButton => {if (operatorButton.value != 'borrado') operatorButton.classList.add('buttonDisabled')});

       
};


// Función que capta las teclas
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
    if (k == ',' || k == '.') {add(',')}
    if (k == 'Control') {changeSign()}
    if (k == 'Enter') {buttonEqual()}
    if (k == 'Escape') {buttonClear()}
    if (k == 'Backspace') {buttonDeleteOneNumber()}
}
    
