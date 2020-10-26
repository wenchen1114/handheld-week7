let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let last_x = 0;
let last_y = 0;
let buttonState = 0;
let penDown = false;
let colors = ["rgb(255, 247, 218)", "rgb(252, 255, 236", "rgb(224, 224, 224)", "rgb(245, 255, 255)", "rgb(224, 246, 255)"];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = "rgb(255, 252, 243)";

make_base();

function make_base(){
    let base_image = new Image();
    base_image.src = 'img/bg.png';
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0);
    }
}

function paintStart(x, y){
    last_x = x;
    last_y = y;
    penDown = true;
}

function paintMove(x, y){
    ctx. beginPath();
    let num = Math.floor(Math.random()* 5);
    ctx.fillStyle = colors[num];
    ctx.arc(last_x, last_y, 5, 0, Math.PI*2);
    ctx.fill();
    last_x = x;
    last_y = y;
}

function paintMove2(x, y){

}

canvas.addEventListener("mousedown", function(evt){
    let x = evt.clientX;
    let y = evt.clientY;

    paintStart(x,y);
    paintMove(x, y);
})

canvas.addEventListener("mouseup", function (evt) {
    penDown = false;
  });