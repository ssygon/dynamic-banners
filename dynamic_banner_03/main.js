var container;
var bgExit;
var htmlCopy;
var rplClick = false;
var rplAuto = true;
var bounce = true;

init = function(){
  container = document.getElementById('container');
  bgExit = document.getElementById('exit');
	htmlCopy = $('#container').html();
  container.style.display = "block";
  frame0();
};

function frame0() {
  TweenLite.set('#sky', {x:7, y:-11,z:-400, scale:2.1});
  TweenLite.set('#carALL', {x:52, y:46, scale:0.08});
  from($('#main'), 1, {alpha: 0}, "out");
  to($('#sky'), 10, {x:-20}, "none");
//  to($('#carALL'),9.5, {x:0, y:0,scale:1}, "inout",1);
to($('#carALL'),7, {x:20, y:26,scale:0.64}, "inout",1);
//to($('#carALL'),8, {x:10, y:18,scale:0.80}, "inout",1);
  wait(3, frame1);
};

function frame1(){
  carBounce();
  to($('#logo'), 0.3, {alpha:0}, "out");
  to($('#plate'), 0.3, {y:30,alpha:0}, "in");
  txtAnim('in','#txt0',0);
  wait(1.6,frame2);
};

function frame2(){
  txtAnim('out','#txt0',0);
  txtAnim('in','#txt1',0.5);
    bounce = false
  wait(3.1,frame4);
};


function frame4(){
  txtAnim('out','#txt1',0);
  txtAnim('in','#txt2',0.5);
  from($('.t6'), tSpeed, {x:-20, alpha:0, overwrite:'auto'}, 'out', 1);
  to($('#img1'), 0, {alpha:1}, "out",0.5);
  from($('#ctaBTN'), 0.5, {y:40,alpha:0, onComplete:setCTA}, "backout",1.05);
  if(!rplClick){
    from($('.replay'), 0.65, {y:-10,alpha:0, onComplete:resetReady}, "out", 3.5);
  };
};

function carBounce(){
  if(bounce){
    to($('#carT'), 0.05, {y:0.5, onComplete:function(){
      to($('#carT'), 0.05, {y:0,onComplete:carBounce}, "out");
    }}, "out");
  };
};

var tSpeed=0.4;

function txtAnim(io,e,d){
  var l = $(e).children();
  for(var i = 0; i < l.length; i++){
    if (io=='in'){
      from($(l[i]), tSpeed, {x:-20, alpha:0, overwrite:'auto'}, 'out', d);
    } else if (io=='out'){
      to($(l[i]), tSpeed*0.6, {x:20,alpha:0, overwrite:'auto'}, 'in', d);
    };
    d+=0.18;
  };
};


function resetReady() {
  $('.replay').mouseover(function(){
    to($(this), 0.15, {alpha: 0.5}, "none");
  });
  $('.replay').mouseout(function(){
    to($(this), 0.15, {alpha: 1}, "none");
  });
  $('.replay').click(function(){
    killAll();
    rplClick = true;
    $(this).unbind('click');
    $('#exit').unbind('mouseover');
    $('#exit').unbind('mouseout');
		to($('#main'), 0.45, {alpha:0}, "none");
		to($('#common'), 0.45, {alpha:0}, "none");
		to($('.replay'), 0.45, {y:-50}, "in");
		wait(0.75, function(){
			$('#container').html(htmlCopy);
			frame0();
		});
  });
};
function setCTA(){
  $('#exit').mouseover(function(){
    to($('#ctaBTN'), 0.4, {x:5}, "backout");
  });
  $('#exit').mouseout(function(){
    to($('#ctaBTN'), 0.2, {x: 0}, "sinein");
  });
};
window.addEventListener('load', init);
