"use strict";



var wHeight, wWidth, wMin, mCanv, cM, image, wid, zCanv, fps = 100,
  pg, aniMat, r, z, mCase = 1,zC, reSize, reStart, touPoint, iw, ih,iLink,proLink;

mCanv = document.getElementById("image");
zCanv = document.getElementById("zoom");
cM = mCanv.getContext("2d");
zC = zCanv.getContext("2d");

wHeight = window.innerHeight;
wWidth = window.innerWidth;
wMin = Math.min(wHeight, wWidth);
wid = wMin - (4 / 100) * wMin;
r = ~~(wid / 20);
pg = { x: wid / 2, y: wid / 2 };
z = { x:0,y:-r,r:Math.PI/2};
mCanv.height = wid;
mCanv.width = wid;
zCanv.height = wid;
zCanv.width = wid;
cM.strokeStyle

image = new Image();
proLink = prompt("\tWellcome Again everyone 🦧\n__________________________\n\n\t🏞️If\n\t you have any image link Please Enter \n\tif not press cancel: \n__________________________\n\n\t it's support all type image  eg - \n\t any resolution, any size, any format's - (Maybe 🧐) \n__________________________\n\n \t Please comment us & share your experience\n__________________________\n\n\n","https://raw.githubusercontent.com/Monu-Parashar/Image-Zooming-Canvas/master/ruins.jpg");
if (proLink) {
  image.src = proLink;
} else {image.src = "https://raw.githubusercontent.com/Monu-Parashar/Image-Zooming-Canvas/master/ruins.jpg";};


image.onerror = function(e){alert("Error:\n\nPlease enter a valid url\n\n(Refresh the window or comment if you see error)");window.location.reload(true);};
image.onload = function(){
  reSize();
}

reSize = function() {
  wHeight = window.innerHeight;
  wWidth = window.innerWidth;
  wMin = Math.min(wHeight, wWidth);
  wid = ~~(wMin - (4 / 100) * wMin);
  r = ~~(wid / 20);
  iw = image.width;
  ih = image.height;
  image.height = wid;
  image.width = wid;
  reStart();
};

reStart = function() {
  
  mCanv.height = wid;
  mCanv.width = wid;
  zCanv.height = wid;
  zCanv.width = wid;
  cM.clearRect(0, 0, wid, wid);
  cM.drawImage(image, 0, 0, wid, wid);
};


aniMat = function(){
  
  zC.clearRect(0,0,wid,wid);
  zC.strokeStyle = "#fff";
  zC.beginPath();
  zC.arc(pg.x,pg.y,r,z.r +Math.PI,z.r +3*Math.PI);
  zC.lineTo(pg.x + z.x*5,pg.y + z.y*5);
  zC.stroke();
  zC.strokeRect(pg.x + z.x*5 - r*2 -.1,pg.y + z.y*5 - r*2 -.1,r*4 +.2,r*4+.2);
  zC.drawImage(image,((pg.x/wid)*iw)-r*2,((pg.y/wid)*ih) - r*2, r*4,r*4,pg.x + z.x*5 -r*2,pg.y + z.y*5 -r*2,r*4,r*4);
  
};

touPoint = function(e){
  z = { x:0,y:-r,r:Math.PI/2};
  if(!(e.pageX <0||e.pageX>wid||e.pageY<0||e.pageY>wid)){pg={x:e.pageX,y:e.pageY};};
  if (e.pageX < r) { pg.x = r;} else if (e.pageX > wid-r) { pg.x = wid - r; }
  if (e.pageY < r) { pg.y = r; }else if (e.pageY > wid-r){pg.y =wid -r; }
  if (e.pageX - r*2<0) {
    z = { x:r,y:0,r:Math.PI};
  } else if (e.pageX +r*2 >wid){
    z = { x:-r,y:0,r:0};
  }if (e.pageY -r*7 <0) {
    z = { x:0,y:r,r:-Math.PI/2};
  }
  aniMat();
};


zCanv.onclick = function(e){touPoint(e);};
zCanv.ontouchmove = function(e){touPoint(e.touches[0]);};