window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("display"); //elemento pantalla de salida
    document.onkeydown = teclado; //función teclado disponible
}

function setResult(value) {
    document.getElementById('display').value = value;
}

function getResult() {
    return(document.getElementById('display').value);
}

function changeSign() {
    var x = document.getElementById('display').value;
    var resul = -x;
    document.getElementById('display').value = resul;
}

function add(key) { 
    var result = getResult();
    if (result!='0' || isNaN(key)){ 
        setResult(result + key);
    }
    else setResult(key);
   
}

function calc() {
    var result = eval(getResult()); 
    setResult(result);
}

function buttonClear(){
    document.getElementById("display").value = "";
    removeHighlight();
}

function buttonDeleteOneNumber(){
    removeHighlight();
    document.getElementById('display').value = pantalla.value-1;
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

function setHighlight(x){
    removeHighlight();
    let changeClass = x.currentTarget.classList
    changeClass.add("hoverOperator")
}   

function removeHighlight(){
    let changeClass = document.getElementsByClassName('operators');
    for (let index = 0; index < changeClass.length; index++) {
        changeClass[index].classList.remove('hoverOperator');
        
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
    
