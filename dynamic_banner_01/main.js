var container;
var bgExit;
var htmlCopy;
var currCar = 0;
var carS = ['0px 0px','0px -147px','0px -294px','0px -441px','0px -588px','0px -735px','0px -882px'];
var clickCnt;
var auto;

/*
var creative = {};
function preInit() {
setup();
if (Enabler.isInitialized()) {
init();
} else {
Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
};
};
function init() {
creative.dom.exit.addEventListener('click', exitClickHandler);
if (Enabler.isPageLoaded()) {
frame0();
} else {
Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, frame0);
};
};
function exitClickHandler() {
Enabler.exit('BackgroundExit');
};
*/
function setup(){
  // creative.dom = {};
  // creative.dom.exit = document.getElementById('exit');
  container = document.getElementById('container');
  bgExit = document.getElementById('exit');
  htmlCopy = $(container).html();
  frame0();
};

function frame0() {
  auto = true;
  clickCnt = 0;
  currCar = 0;
  TweenLite.set('#main', {perspective:600});
  TweenLite.set('.txt', {perspective:600});
  from($('#main'), 1, {alpha: 0}, 'sineout');
  wait(0.01, frame1);
};

function frame1() {
  to($('#bgALL'), 2, {x:-275}, "sineinout",0);
  wait(1,titleIN);
  wait(1.2, frame2);
};

function frame2() {
  buttInit();
  autoInit();
};

function frame3() {
  buttClear();
  wait(1.4, endInit);
};

function autoInit(){
  trace('Auto : Init');
  if (clickCnt>0){
    trace('colour selected : 3sec count')
    wait(3,autoPlay);
  }else{
    trace('colour not selected : 7sec count')
    wait(7,autoPlay);
  }
};

function resetAuto(){
  killAuto();
  trace('Auto : Killed');
  if (!auto){
    auto = true;
    trace('Auto : True & Reset');
    autoInit();
  }
};

function killAuto(){
  trace('Auto : Kill Fired');
  kill(autoPlay);
};

function setAsset(n,autoplaying){
  if (!autoplaying){
    TweenLite.set('#b'+currCar, {alpha:1});
    TweenLite.set('.cars', {backgroundPosition:carS[n]});
    TweenLite.set('#b'+n, {alpha:0.5});
    currCar = n;
    trace(n+' = clicked')
    if (clickCnt>=6){ //check btn click count
      auto = false;
      killAuto();
      trace('Click limit reached');
      frame3();
    }else{
      auto = false;
      clickCnt++
      resetAuto();
    };
  }else{
    TweenLite.set('#b'+currCar, {alpha:1});
    TweenLite.set('.cars', {backgroundPosition:carS[n]});
    TweenLite.set('#b'+n, {alpha:0.5});
    currCar = n;
  };
};

function autoPlay(){
  if (!auto){
    trace('Auto : Not Enabled');
  }else{
    trace('Auto : Playing');
    unbindBtns();
    var dl = 0;
    for(var i = 0; i <= 6; i++){ //loop auto btn clicks
      let x = i;
      wait(dl,function(){
        trace(x+' = clicked')
        setAsset(x,true);
        if(auto==true & currCar>=6){
          wait(0.75,frame3);
        };
      });
      dl+=0.75;
    };
  };
};

function buttInit(n){ //set btn functions/show anim
  var d = 0;
  for(var i = 0; i <= 6; i++){
    let x = i;
    from($('#b'+i),0.5,{y:15, alpha:0}, 'backout', d);
    d+=0.09;
    $('#b'+x).click(function(){
      setAsset(x,false);
    });
    $('#b'+i).mouseover(function(){
      to($('#b'+x), 0.35, {scale: 1.5}, "backout");
    });
    $('#b'+i).mouseout(function(){
      to($('#b'+x), 0.2, {scale: 1}, "backout");
    });
  };
  wait(0.5,labelShow);
};

function buttClear(){
  var d=0;
  unbindBtns();
  for(var i = 0; i <= 6; i++){ //loop btn out
    to($('#b'+i),0.3,{y:10, alpha:0}, 'backin', d);
    d+=0.05;
  };
  wait(1.4,function(){
    hideElement('.selector');
  });
};

function unbindBtns(){
  for(var i = 0; i <= 6; i++){
    $('#b'+i).unbind('click');
    $('#b'+i).unbind('mouseover');
    $('#b'+i).unbind('mouseout');
    TweenLite.set($('#b'+i), {scale: 1, cursor: "default"});
  };
};

function titleIN(){
  var lines = Array.prototype.slice.call(
    document.getElementsByClassName('tLine')
  );
  TweenLite.set($(lines), {visibility: "visible"});
  from($(lines), 0.5, {x:lines[0].clientWidth/2, width:0}, 'sineout')
  from($('.title'), 0.4, {z:-200, alpha:0}, 'sineout',0.5);
};

function labelShow(){
  TweenLite.set('#b0', {alpha:0.5});
  from($('.label'), 0.4, {scale:0.2, alpha:0}, 'backout', 0);
  from($('.labelT'), 0.5, {alpha:0}, 'out', 0.3);
  wait(2.5,function(){
    to($('.label'), 0.4, {scale:0.2, y:5, alpha:0, overwrite:'auto'}, 'backin', 0);
  });
};

function endInit(){
  $('#exit').mouseover(function(){
    to($('.ctaBTN'), 0.6, {x:5, overwrite:'auto'}, "out");
    to($('.ctaHIT'), 0.6, {alpha: 1,overwrite:'auto'}, "out");
  });
  $('#exit').mouseout(function(){
    to($('.ctaBTN'), 0.3, {x:0, overwrite:'auto'}, "in");
    to($('.ctaHIT'), 0.3, {alpha: 0,overwrite:'auto'}, "in");
  });
  from($('.ctaBTN'), 0.5, {y:10, alpha:0}, "pow4out", 0);
  from($('.replay'), 0.65, {y:-50,alpha:0, onComplete:resetReady}, "out", 3.5);
};

function resetReady() {
  $('.replay').click(function(){
    $(this).unbind('click');
    to($('.replay'), 0.5, {y:-25,alpha:0}, "sinein", 0);
    to($('.ctaBTN'), 0.2, {y:10,alpha:0}, "sinein", 0);
    to($('#main'), 0.4, {alpha:0}, "sinein", 0.1);
    to($('#common'), 0.4, {alpha:0}, "sinein", 0.1);
    wait(0.7, cleanUp);
  });
};

function cleanUp() {
  killAll();
  $('#container').html(htmlCopy)
  wait(0.1, frame0);
};

// window.addEventListener('load', preInit);
window.addEventListener('load', setup);
