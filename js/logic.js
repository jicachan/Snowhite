function writeSomething() {
    console.log("Äpplet klickades!");
}

function removeApple(elId) {    
    var element = document.getElementById(elId);    
    element.parentNode.removeChild(element);
}

function changeApple() {    
    var appleimg = document.getElementById("A5"); //id på image, inte länk
    var infotext = document.getElementById("appletext");

    appleimg.src = "images/appleself.png";
    infotext.innerHTML = "Du hittade Apple! (^0^)/"
} 

function slideToRight(btnId) {
    var snovit = document.getElementById("snovit");
    var pos = 50;
    var id = setInterval(frame, 5);  
        
    function frame() {
        if(pos == 500) {
            clearInterval(id);            
        }
        else {
            pos++;
            snovit.style.left = pos + 'px';
            snovit.style.right = pos + 'px';
        }
    }    
    document.getElementById(btnId).disabled = true;
}

function slideToLeft(btnId) {
    var snovit = document.getElementById("snovit");
    var pos = 500;
    var id = setInterval(frame, 5);   
    
    function frame() {
        if(pos == 50) {
            clearInterval(id);            
        }
        else {
            pos--;
            snovit.style.right = pos + 'px';
            snovit.style.left = pos + 'px';
        }
    }
    document.getElementById(btnId).disabled = true;   
}

function turnLeft(btnId) {
    document.getElementById("snovit-poor").src = "images/snowhite-poor-side.jpg";
    document.getElementById(btnId).disabled = true;    
}

function turnToBack(btnId) {
    document.getElementById("snovit-poor").src = "images/snowhite-poor-back.jpg";  
    document.getElementById(btnId).disabled = true;  
}



