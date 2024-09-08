var tSpeed = 0.5;
var imagesLoaded = 0;
var images = [];
var data;
var copyArray;

window.onload = function () {
  // If true, start function. If false, listen for INIT.
  if (Enabler.isInitialized()) {
    loadData();
  }
  else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, loadData);
  }
}

function loadData() {
  // Dynamic Content variables and sample values
  Enabler.setProfileId(10447976);
  var devDynamicContent = {};

  devDynamicContent.FIJ0051_Dynamic_Banners_300x250 = [{}];
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0]._id = 0;
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Backup_Image = {};
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Backup_Image.Type = "file";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Backup_Image.Url = "https://s0.2mdn.net/ads/richmedia/studio/22731316/22731316_20190509193933469_FIJ0051_Dynamic_Banners_1_300x250_BACKUP.jpg";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].ClickThrough_URL = {};
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].ClickThrough_URL.Url = "https://www.fiji.travel/";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Image = {};
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Image.Type = "file";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Image.Url = "https://s0.2mdn.net/ads/richmedia/studio/22731316/22731316_20190509172401960_FIJ0051_Dynamic_Banners_1_300x250.jpg";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Text_Size = "41px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Copy = "Married one moment,\\on honeymoon the next.";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Copy_offset_x = "15px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Copy_offset_y = "15px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Copy_Transition = 1;
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].CTA_Text = "Find out more &gt;";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].CTA_Text_Size = "13px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].CTA_offset_x = "178px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].CTA_offset_y = "98px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Color = "#183f6c";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Logo_width = "65px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Logo_offset_x = "233px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Logo_offset_y = "183px";
  devDynamicContent.FIJ0051_Dynamic_Banners_300x250[0].Logo_colour = "white";
  Enabler.setDevDynamicContent(devDynamicContent);


  data = dynamicContent.FIJ0051_Dynamic_Banners_300x250[0]; // Load data fields
  init()
}

function init(){
    // bind exit handler
    $("#exit").click(function() { exitClickHandler() });
  
    // call banner setup
    setup();
}

function exitClickHandler() {
  // exit handler pulls from feed
  Enabler.exit("background_exit", data.ClickThrough_URL.Url);
}

// Split main text for a new line
function splitCopy(text) {
  let textArray = text.split(/\\/);
  return textArray;
}

function setup() {
  // preload images
  var images = [
     ["#bg", data.Image.Url]
    // ["#bg", data.Backup_Image.Url]
  ]

  loadImages(images);

  copyArray = splitCopy(data.Copy);

  // text copy
  var copy = wrapCopy( copyArray );

  // mapping text with position
  var mapping = [
    ["#txt0",  copy, data.Copy_offset_x, data.Copy_offset_y, data.Text_Size],
    [".cta-text", data.CTA_Text, "0px", "0px", data.CTA_Text_Size],
    [".logo", "", data.Logo_offset_x, data.Logo_offset_y, "0px"]
  ]

  mapElements(mapping)

  // set logo height and width
  $(".logo").css({"width": data.Logo_width, "height": data.Logo_width});
  
  // logo colour
  if (data.Logo_colour === 'blue') {
    $(".logo").css({"background-position": 'left -63px'});
  }

  // set CTA button position
  $("#ctaBTN").css({"top": data.CTA_offset_y, "left": data.CTA_offset_x});

  // set body background colour
  $("#container").css({"background": data.Color})
}

function wrapCopy(c) {
  var copy = "";
  for(var i=0; i<c.length; i++){
    copy += "<span>" + c[i] + "</span>"
  }
  return copy;
}

function loadImages(l) {
  for(var i=0; i<l.length; i++) {
    let el = $(l[i][0]);
    let src = l[i][1];
    
    $(el).css("background-image", 'url(' + src +')');
    images.push(new Image());
    images[i].src = src,
    images[i].onload = imageLoaded;
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded >= images.length) {
    frame0();
  }
}

function mapElements(m) {
  for(var i=0; i<m.length; i++) {
    let el = $(m[i][0]);
    let copy = m[i][1];
    let x = m[i][2];
    let y = m[i][3];
    let sz = m[i][4]

    // fill in the element
    $(el).html(copy);
    $(el).css({"top": y, "left": x, "font-size": sz})
  }
}

// Animate each text line
function animateTextLines(textArray) {
  let totalDelay = 0;
  let delay = data.Copy_Transition;
  let t = textArray || [];
  for (let i=0; i<t.length; i++) {
    from($("#txt0").children().eq(i), tSpeed, {height:0, 'margin-top':'30px', overwrite:'auto', alpha:0}, 'backout', i * delay);
    totalDelay += delay;
  }
  return totalDelay;
}

function frame0() {
  from($('#main'), 1, {alpha: 0}, 'sineout');
  from($('.logo'), 0.5, {alpha: 0, scale:0.5, rotation:-30}, 'backout',0.5);
  wait(1, frame1);
}

function frame1() {
  let totalDelay = animateTextLines(copyArray);
  wait(totalDelay+0.5, endInit);
}

function endInit() {
  $('#exit').mouseover(function(){
    to($('#ctaBTN'), 0.25, {x:5}, "pow4out", 0);
    to($('.ctaMARK'), 0.3, {x:5,overwrite:'auto'}, "backout");
  });
  $('#exit').mouseout(function(){
    to($('#ctaBTN'), 0.2, {x:0}, "pow4in", 0);
    to($('.ctaMARK'), 0.3, {x: 0,overwrite:'auto'}, "in");
  });
  from($('#ctaBTN'), 0.5, {x:-10, alpha:0}, "backout", 0);
  from($('.ctaMARK'), 0.5, {x:-10, alpha:0}, "backout", 0.35);
};