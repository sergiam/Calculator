function buttonEqual(){
    document.getElementById("display").value += "=";

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
    var num = document.getElementById("display").value = "";

}


