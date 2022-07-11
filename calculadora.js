function buttonEqual(){
    document.getElementById("display").innerHTML += "=";

}

function takeValue(x){
    document.getElementById("display").innerHTML += x;
 
}

function buttonDeleteOneNumber(){
    var exp = document.calculator.textview.value;  
    document.calculator.textview.value = exp.substring(0, exp.length - 1);

}

function buttonClear(){
    var num = document.getElementById("display").innerHTML = "";

}


