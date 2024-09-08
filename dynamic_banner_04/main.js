var easeIn = "easeIn";
var easeOut = "easeOut";
var duration = 0.2;
var delay = 0.2;
var fDelay = 1.2;
var htmlCopy = "";

setup = function(){
  // updateTimer();
  htmlCopy = $("#container").html();
  frame1();
};

function frame1() {
  fadeIn("#main", 0);
  var d1 = stagger("#copy #f1", delay, false);
  wait(d1 + fDelay, frame2);
}

function frame2() {
  var d1 = stagger("#copy #f1", delay, true);
  var d2 = stagger("#copy #f2", delay, false);
  wait(d1 + fDelay, frame3);
}

function frame3() {
  var d1 = stagger("#copy #f2", delay, true);
  var d2 = stagger("#copy #f3", delay, false);
  wait(d1 + fDelay, frame4);
}

function frame4() {
  var d1 = stagger("#copy #f3", delay, true);
  var d2 = stagger("#copy #f4", delay, false);
  wait(d1 + fDelay, frame5);
}

function frame5() {
  var d1 = stagger("#copy #f4", delay, true);
  var d2 = stagger("#copy #f5", delay, false);
  wait(d1 + fDelay, frame6);
}

function frame6() {
  var d1 = stagger("#copy #f5", delay, true);
  wait(d1, frame7);

}

function frame7() {
  var d1 = stagger("#copy #f6", delay, false);
  slideIn("#logo", delay);
  slideUp("#cta", delay);
  slideDown("#replay", delay*6);
  framesCompleted();
}

function slideIn(el, delay) {
  from($(el), duration, {x:-20, alpha: 0}, easeIn, delay)
}

function slideUp(el, delay) {
  from($(el), duration, {y:20, alpha: 0}, easeIn, delay)
} 

function slideDown(el, delay) {
  from($(el), duration, {y:-20, alpha: 0}, easeIn, delay)
} 

function fadeIn(el, delay) {
  from($(el), duration, {alpha: 0}, easeIn, delay)
}

function stagger(container, delay, out) {
  var elements = $(container).children();
  for(var i = 0; i < elements.length; i++){
    if (out) {
      to($(elements[i]), duration, {x:20, alpha: 0}, easeOut, delay * (i+1))
    }
    else {
      from($(elements[i]), duration, {x:-20, alpha: 0}, easeIn, delay * (i+1))
    }
  };

  return duration + delay * elements.length;
}

function framesCompleted(){
  $("#replay").click(function(){
    $("#main").hide();
    $("#container").html(htmlCopy);
    init = false;
    frame1();
  })
}

setup();