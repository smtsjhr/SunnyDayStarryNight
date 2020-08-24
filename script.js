var scroll_rate = 0;
var scale;
var W;
var H;
var D;

const enable_interaction = true;

var scrolling = false;
var get_mouse_pos = false;
var get_touch_pos = false;

const t_purerate = .02;
var t = 0;

const fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var canvas_container = document.getElementById("canvas_container");

canvas_container.style.height = window.innerHeight+'px';
canvas_container.style.width = window.innerWidth+'px';
D = Math.min(window.innerWidth, window.innerHeight);
scale = D/1920;
W = canvas.width = 1920*scale;
H = canvas.height = W*1080/1920;
canvas_container.style.top = `${(window.innerHeight-H)/2}px`;
canvas_container.style.left = `${(window.innerWidth-W)/2}px`; 

window.scrollTo(0,0);


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t) {
    x.fillStyle=`hsla(${h=50*S(u=t/5)},99%,${20+h}%,.2)`;

    x.translate(scale*(980+980*C(u)),scale*(1e3-800*S(u)));

    for(f=32;f--;x.rotate(f*(.196))) {
        for(i=50;i--;)
            {x.fillRect(scale*100*(25-i+(t/(Math.PI/4))%1),scale*200,scale*(50-30*S(u)),scale*1e4);
        }
    }
}



startAnimating(fps);



function draw() {

    scale = D/1920;

    W = canvas.width = 1920*scale;
    H = canvas.height = W*1080/1920; 
    
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, W, H);

    DwitterCode(t);

    t += t_purerate + scroll_rate;
   
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();
            
     }

     window.onresize = function(e) {
        canvas_container.style.height = window.innerHeight+'px';
        canvas_container.style.width = window.innerWidth+'px';
        D = Math.min(window.innerWidth, window.innerHeight);
        scale = D/1920;
        W = canvas.width = 1920*scale;
        H = canvas.height = W*1080/1920;
        canvas_container.style.top = `${(window.innerHeight-H)/2}px`;
        canvas_container.style.left = `${(window.innerWidth-W)/2}px`; 

     }

     if(enable_interaction) {
        window.addEventListener('scroll', function(e) {
            scroll_pos = window.scrollY;
          
            if (!scrolling) {
              window.requestAnimationFrame(function() {
                scroll_action(scroll_pos);
                scrolling = false;
              });
          
              scrolling = true;
            }
          });
     }
  
 }

function scroll_action(scroll_pos) {
    y_scroll = scroll_pos/(5000 - H);
    scroll_rate = .05*y_scroll;
}

