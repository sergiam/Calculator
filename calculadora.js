//const display = document.getElementById("display");
var operatorOn = false;
var num1;
var num2;
var operator;


window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("display"); //elemento pantalla de salida
    document.onkeydown = teclado; //función teclado disponible
}


function add(a)
{	
    if (!operatorOn && (num1 === undefined || num1 == "")) {
        document.getElementById("display").value=a;
        num1 = document.getElementById("display").value;
        console.log(num1);
    } else if(!operatorOn) {
        document.getElementById("display").value+=a;
        num1 = document.getElementById("display").value;
        console.log(num1);
    } else if (operatorOn && (num2 === undefined || num2 == "")){
        document.getElementById("display").value=a;
        num2 = document.getElementById("display").value;
        console.log(num2);
    } else {
        document.getElementById("display").value+=a;
        num2 = document.getElementById("display").value;
        console.log(num2);
    }
}

//Cambiar nombres de variables para que sean coherentes
function operation(c) {
    c.style.backgroundColor='red';
    operatorOn = true;
    operator = c;
}

function calc(){
    var resul;
    console.log(operator.value);
		if (operator.value == '*') {
           resul = parseFloat(num1) * parseFloat(num2);
        }
        console.log(resul);
        return resul;
// Hacer las demás operaciones restantes igual que esta
}

function buttonEqual(){
    var a = calc();
    console.log(a);
    document.getElementById('display').value = a; 
    reset();
}

function reset(){
    operator.style.backgroundColor='#d1d1d1';
    operator = undefined;
    num1 = "";
    num2 = "";
    
}

function changeSign() {
    var x = document.getElementById('display').value;
    var resul = -x;
    document.getElementById('display').value = resul;
}

function buttonClear(){
    document.getElementById("display").value = "";
    reset();
}

function buttonDeleteOneNumber(){
    removeHighlight();
    var num = document.getElementById("display").value;
    var str = num.toString();
    num = str.slice(0, str.length - 1);
    document.getElementById("display").value= num;
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
    if (k==88) {add('*')} //tecla multiplicación
    if (k==107) {add('+')} //tecla suma
    if (k==109) {add('-')} //tecla resta
    if (k==111) {add('/')} //tecla división
    if (k==188) {add('.')}
    if (k==106) {add('*')}
    if (k==189) {add('-')}
    if (k==17) {changeSign()}
    if (k==13) {calc()} //Tecla igual: intro
    if (k==27) {buttonClear()} //Tecla borrado total: "esc"
    if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
    if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
    }
    
