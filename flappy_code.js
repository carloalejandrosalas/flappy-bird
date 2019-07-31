var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var gameStarted = false;

// load Sounds
var fly_sound = new Audio();
var points_sound = new Audio();

// Load images
var bird = new Image();
var bg = new Image();
var footer = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "../assets/bird.png";
bg.src = "../assets/bg.png";
footer.src = "../assets/footer.png";
pipeNorth.src = "../assets/pipeNorth.png";
pipeSouth.src = "../assets/pipeSouth.png";

fly_sound.src = "../assets/sounds/fly.mp3";
points_sound.src = "../assets/sounds/score.mp3";


// Variables
var gap = 100;
var constant = pipeNorth.height+gap;

var bird_x = 10;
var bird_y = 150;
var gravity = 1.2;
var points = 0;

// Our Pipes
var pipes = [];

pipes[0] = {
    x: canvas.width,
    y: 0
}


document.addEventListener('keyup', function(event) {
    if(gameStarted){
        if(event.key == 'ArrowDown') {
        moveDown();
        } else if(event.key == 'ArrowUp') {
            moveUp();
        } else {
            console.warn('No action with Key: '+ event.key );
        }
    } else {
        if(event.key="Espace") {
            gameStarted = true;
            draw();
        }
    }
});

function moveUp() {
    console.log('hacia arriba');
    bird_y -= 30;
    fly_sound.play();
}

function moveDown() {
    console.log('hacia abajo');
    bird_y += 30;
    fly_sound.play();
}

points
function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for (const pipe of pipes) {

        // if(pipe.x + pipeNorth.width < -50) {
        //     pipes.shift();
        // }

        const { x, y} = pipe;

        ctx.drawImage(pipeNorth, x, y);
        ctx.drawImage(pipeSouth, x, y + constant);

        pipe.x--;

        if(pipe.x == 125){
            console.log(pipes);
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) -
                pipeNorth.height
            })
        }

        if(pipe.x == 5) {
            points++;
            points_sound.play();
        }

        // detect collison
        if(bird_x + bird.width >= pipe.x && bird_x <= pipe.x + pipeNorth.width
            && (bird_y <= pipe.y + pipeNorth.height || bird_y+ bird.height >= pipe.y + constant) || 
            bird_y + bird.height >= canvas.height - footer.height ){
               location.reload(); 
            }
    }
    
    ctx.drawImage(footer, 0, canvas.height - footer.height);
    
    ctx.drawImage(bird, bird_x, bird_y);

    bird_y += gravity;

    ctx.font="20px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.fillText('Points: '+points, 2, 500);
    
    requestAnimationFrame(draw);
}

function loadGame() {
    ctx.drawImage(bg, 0, 0);
    ctx.font="20px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.fillText('Press SPACE to START ', canvas.width / 2, canvas.height / 2);
    
}

setTimeout(loadGame, 20);