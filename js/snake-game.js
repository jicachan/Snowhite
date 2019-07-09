

var mintPiece, apple;
var obstacles = [];
var scores;

function startGame() {    
    mintPiece = new component(5, 5, "red", 100, 400);
    apple = new component(20, 20, "#00FFFF", 100, 400);    
    scores = new component("50px", "Consolas", "black", 30, 50, "text");
    gameArea.start();
}

function restart() {
     document.location.href = "";
}

/// GameArea
// Spelplanen
var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[6]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }    
}

/// Component
//Komponenter (spelpjäser och hinder)
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;          

    this.update = function() {
        ctx = gameArea.context;
        if(this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }   
        else {
            ctx.beginPath();                             
            ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);               
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fill();        
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }             
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

// Spelets gång
function updateGameArea() {
    var x;
    var height, gap, minHeight, maxHeight, minGap, maxGap;
    
    for (i = 0; i < obstacles.length; i += 1) {
        if (mintPiece.crashWith(obstacles[i])) {
            gameArea.stop();
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNo += 1;   

    if (gameArea.frameNo == 1 || everyinterval(200)) {
        x = gameArea.canvas.width;

        // Beräkna hur stort gapet ska vara mellan hinderna
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 220;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

        // y = gameArea.canvas.height - 320;
        obstacles.push(new component(20, height, "#7fa046", x, 0));
        obstacles.push(new component(20, (x - height - gap), "#804000", x, (height + gap)));
    }
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    scores.text = "Poäng: " + gameArea.frameNo;
    scores.update();
    mintPiece.newPos();    
    mintPiece.update();

    if (gameArea.key && gameArea.key == 37) {
        mintPiece.speedX = -1;
    }
    if (gameArea.key && gameArea.key == 39) {
        mintPiece.speedX = 1;
    }
    if (gameArea.key && gameArea.key == 38) {
        mintPiece.speedY = -1;
    }
    if (gameArea.key && gameArea.key == 40) {
        mintPiece.speedY = 1;
    }
}

function everyinterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function moveup() {
    mintPiece.speedY -= 1; 
}

function movedown() {
    mintPiece.speedY += 1; 
}

function moveleft() {
    mintPiece.speedX -= 1; 
}

function moveright() {
    mintPiece.speedX += 1; 
}

function stopMove() {
    mintPiece.speedX = 0; 
    mintPiece.speedY = 0; 
}






