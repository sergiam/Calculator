window.onload = function(){ //Acciones tras cargar la página
    pantalla=document.getElementById("display"); //elemento pantalla de salida
    document.onkeydown = teclado; //función teclado disponible
}

function buttonEquals(){
    document.getElementById("display").value += "=";
    removeHighlight();
}

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

function buttonClear(){
    document.getElementById("display").value = "";
    removeHighlight();
}


function teclado (event) { 
    events = event || window.event;
    k=events.keyCode; 
  
    if (k>47 && k<58) { 
       p=k-48; 
       p=String(p)
       takeValue(p);
       }	

    if (k>95 && k<106) {
       p=k-96;
       p=String(p);
       takeValue(p);
       }
    if (k==88) {takeValue('x')} //tecla multiplicación
    if (k==107) {takeValue('+')} //tecla suma
    if (k==109) {takeValue('-')} //tecla resta
    if (k==111) {takeValue('/')} //tecla división
    if (k==13) {buttonEquals()} //Tecla igual: intro
    if (k==27) {buttonClear()} //Tecla borrado total: "esc"
    if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
    if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
    }