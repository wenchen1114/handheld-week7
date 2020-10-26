//morse code from https://gist.github.com/lauri-kaariainen/8089926
var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var morsecode =[
    '.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....',
    '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.',
    '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-',
    '-.--', '--..'
  ];
var morseArray = new Array();
var length = abc.length;
for(var i = 0;i < length;i++){
	morseArray[morsecode[i]] = abc[i];
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dit = document.getElementById("dit");
let dah = document.getElementById("dah");
let space = document.getElementById("space");

let last_x = 0;
let last_y = 0;
let buttonState = 0;
let penDown = false;
let colors = ["rgb(255, 247, 218)", "rgb(252, 255, 236", "rgb(224, 224, 224)", "rgb(245, 255, 255)", "rgb(224, 246, 255)"];
let word = "";
let words = [];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "rgb(255, 252, 243)";

make_base();

function make_base(){
    let base_image = new Image();
    base_image.src = 'img/bg.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    }
}

function paintStart(x, y){
    last_x = x;
    last_y = y;
    penDown = true;
}

function paintMove(x, y){
    ctx.beginPath();
    let num = Math.floor(Math.random()* 5);
    ctx.fillStyle = colors[num];
    ctx.arc(last_x, last_y, 5, 0, Math.PI*2);
    ctx.fill();
    last_x = x;
    last_y = y;
    word += ".";
}

function paintMove2(x, y){
    ctx.beginPath();
    let num = Math.floor(Math.random()* 5);
    ctx.fillStyle = colors[num];
    ctx.fillRect(last_x-10, last_y+2.5, 20, 5);
    ctx.fill();
    last_x = x;
    last_y = y;
    word += "-";
}

let f = new FontFace('Press Start 2P', 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

f.load().then(function() {
});

function paintText(word){
    for(let i = 0; i<morsecode.length; i++){
        if(word == morsecode[i]){
            words.push(abc[i]);
        }
    }
    let sentence = words.join('');
    ctx.fillStyle = "rgb(255, 252, 243)";
    ctx.font = '16px "Press Start 2P"';
    ctx.fillText(sentence, 10, 100);
    console.log(words);
}

canvas.addEventListener("mousedown", function(evt){
    let x = evt.clientX;
    let y = evt.clientY;

    paintStart(x,y);
    if(buttonState == 1){
        paintMove(x, y);
    }else if(buttonState == 2){
        paintMove2(x, y);
    }
})

canvas.addEventListener("mouseup", function (evt) {
    penDown = false;
  });

canvas.addEventListener("touchstart", function(evt){
    let touches = Array.from(evt.touches);
    let touch = touches[0];

    let x = touch.clientX;
    let y = touch.clientY;

    last_x = x;
    last_y = y;
    paintStart(x,y);
  if(buttonState == 1){
    paintMove(x, y);
}else if(buttonState == 2){
    paintMove2(x, y);
}
})

dit.addEventListener("click", function(){
    buttonState = 1;
})

dah.addEventListener("click", function(){
    buttonState = 2;
})

space.addEventListener("click", function(){
    buttonState = 0;
    console.log(word);
    paintText(word);
    word = "";
})
