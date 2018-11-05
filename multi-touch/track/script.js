function onDocumentReady() {
  let el = document.body;

  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerleave', onPointerLeave);

  //prevent default gestures in iOS
  el.addEventListener('gesturestart', e => e.preventDefault());
  el.addEventListener('gesturechange', e => e.preventDefault());
  el.addEventListener('gestureend', e => e.preventDefault());

  el = document.getElementById("data");
  // prevent default gestures in iOS
  el.addEventListener('gesturestart', e => e.preventDefault());
  el.addEventListener('gesturechange', e => e.preventDefault());
  el.addEventListener('gestureend', e => e.preventDefault());

  // setInterval(() => {
  //   displayData();
  // }, 100)

}

var chk, chk1, chk2, chk3;
var vab = 0;
var elem = document.getElementById("frontPage");
var elemp1 = document.getElementById("page1");
var elemp2 = document.getElementById("page2");
var elemp3 = document.getElementById("page3");
var onPage = "page0";

function displayData() {
  let g = pointers.createPointerGroupings();
  let text = "";
  if (pointers.numOfPointers > 1)
    var { distance, isApproaching } = pointers.comparePointers(pointers.pointerIds[0], pointers.pointerIds[1]);

  if (g.numOfGroupings > 0){
    let pg = g.groupings[0];

    if(pointers.currentXpos(pointers.pointerIds[0]) >= 250 && pointers.currentYpos(pointers.pointerIds[0]) <= 100){

      if(onPage == "page0"){
      onPage = "page1";}

      switch (onPage) {
        case "page1":
          elem.style.opacity = "0.3";
          elemp1.style.left = "2%";
          elemp1.style.top = "0px";
          if(elemp2.style.zIndex != "-1"){
          elemp2.style.zIndex = "-1";}
          if (elemp3.style.zIndex != "-2"){
          elemp3.style.zIndex = "-2";}
          if (elemp1.style.zIndex != "0"){
          elemp1.style.zIndex = "0";}
          elemp1.style.visibility = "visible";
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).isMovingLeft == true && pointers.getPointer(pointers.pointerIds[1]).horizontalSpeed < -300 && onPage == "page1") {
            elemp3.style.left = "2%";
            elemp2.style.left = "2%";
            elemp3.style.top = "0px";
            elemp2.style.top = "0px";
            elemp1.style.top = "0px";
            elemp1.style.left = "2%";
            elem.style.visibility = "visible";
            onPage = "page2";
          }
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).verticalSpeed >= 300 && onPage == "page1") {
            elem.style.visibility = "hidden";
          }
          if (pointers.currentXpos(pointers.pointerIds[1]) >= 150 && pointers.currentXpos(pointers.pointerIds[1]) <= 300
            && pointers.currentYpos(pointers.pointerIds[1]) >= 100 && pointers.currentYpos(pointers.pointerIds[1]) <= 500) {
            Pressure.set('#frontPage', {
              change: function (force) {
                console.log(force);
                if (force == 1) {
                  elemp3.style.left = "12%";
                  elemp2.style.left = "7%";
                  elemp3.style.top = "4%";
                  elemp2.style.top = "2%";
                  elemp1.style.top = "0px";
                  elemp1.style.left = "2%";
                }
              }
            });
          }
          break;
        case "page2":
          elemp2.style.left = "2%";
          elemp2.style.top = "0px";
          if(elemp2.style.zIndex != "0"){
            elemp2.style.zIndex = "0";}
            if (elemp3.style.zIndex != "-2"){
            elemp3.style.zIndex = "-2";}
            if (elemp1.style.zIndex != "-1"){
            elemp1.style.zIndex = "-1";}
          elemp2.style.visibility = "visible";
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).isMovingRight == true && pointers.getPointer(pointers.pointerIds[1]).horizontalSpeed >= 300 && onPage == "page2") {
            elemp1.style.left = "2%";
            elemp3.style.left = "2%";
            elemp1.style.top = "0px";
            elemp3.style.top = "0px";
            elem.style.visibility = "visible";
            onPage = "page1";
          }
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).isMovingLeft == true && pointers.getPointer(pointers.pointerIds[1]).horizontalSpeed < -300 && onPage == "page2") {
            elemp1.style.left = "2%";
            elemp3.style.left = "2%";
            elemp1.style.top = "0px";
            elemp3.style.top = "0px";
            elem.style.visibility = "visible";
            onPage = "page3";
          }
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).verticalSpeed >= 500 && onPage == "page2") {
            elem.style.visibility = "hidden";
          }
          if (pointers.currentXpos(pointers.pointerIds[1]) >= 150 && pointers.currentXpos(pointers.pointerIds[1]) <= 300
            && pointers.currentYpos(pointers.pointerIds[1]) >= 100 && pointers.currentYpos(pointers.pointerIds[1]) <= 500) {
            Pressure.set('#frontPage', {
              change: function (force) {
                console.log(force);
                if (force == 1) {
                  elemp1.style.left = "7%";
                  elemp3.style.left = "12%";
                  elemp1.style.top = "2%";
                  elemp3.style.top = "4%";
                  elemp2.style.top = "0%";
                  elemp2.style.left = "2%";
                }
              }
            });
          }
          break;
        case "page3":
          elemp3.style.left = "2%";
          elemp3.style.top = "0px";
          if(elemp2.style.zIndex != "-2"){
            elemp2.style.zIndex = "-2";}
            if (elemp3.style.zIndex != "0"){
            elemp3.style.zIndex = "0";}
            if (elemp1.style.zIndex != "-1"){
            elemp1.style.zIndex = "-1";}
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).isMovingRight == true && pointers.getPointer(pointers.pointerIds[1]).horizontalSpeed >= 300 && onPage == "page3") {
            elemp1.style.left = "2%";
            elemp2.style.left = "2%";
            elemp1.style.top = "0px";
            elemp2.style.top = "0px";
            elem.style.visibility = "visible";
            onPage = "page2";
          }
          if (pointers.numOfPointers >= 2 && pointers.getPointer(pointers.pointerIds[1]).verticalSpeed >= 500 && onPage == "page3") {
            elem.style.visibility = "hidden";
          }
          if (pointers.currentXpos(pointers.pointerIds[1]) >= 100 && pointers.currentXpos(pointers.pointerIds[1]) <= 300
            && pointers.currentYpos(pointers.pointerIds[1]) >= 100 && pointers.currentYpos(pointers.pointerIds[1]) <= 500) {
            Pressure.set('#frontPage', {
              change: function (force) {
                if (force == 1) {
                  elemp1.style.left = "7%";
                  elemp2.style.left = "12%";
                  elemp1.style.top = "2%";
                  elemp2.style.top = "4%";
                  elemp3.style.top = "0px";
                  elemp3.style.left = "2%";
                }
              }
            });
          }
          break;
        }
    }
    else{
      elem.style.opacity = "1";
      elemp1.style.visibility = "visible";
      elemp2.style.visibility = "visible";
      elemp3.style.visibility = "visible";
      chk = 0;
      onPage = "page1";
      elemp2.style.zIndex = "-1";
      elemp3.style.zIndex = "-2";
      elemp1.style.zIndex = "0";
      elemp1.style.left = "2%";
      elemp2.style.left = "2%";
      elemp1.style.top = "0px";
      elemp2.style.top = "0px";
      elemp3.style.top = "0px";
      elemp3.style.left = "2%";
      elem.style.visibility = "visible";
    }
  }
}

function onPointerUp(e) {
  pointers.removePointer(e.pointerId);
  let el = getOrCreate(e);
  el.classList.remove('down');
}

function onPointerDown(e) {
  e.preventDefault();
  pointers.updatePointer(e);
  setInterval(displayData, 500);
  /*if(!window.addEventListener('mousemove', divMove, true))
    window.addEventListener('mousemove', divMove, true);
  else
    window.removeEventListener('mousemove', divMove, true);*/
}

function divMove(e) {
  elem.style.top = e.clientY + 'px';
  elem.style.left = e.clientX + 'px';
}

function onPointerLeave(e) {
  pointers.removePointer(e.pointerId);
  e.preventDefault();
  let el = getOrCreate(e);
  document.body.removeChild(el);
}

function onPointerMove(e) {
  pointers.updatePointer(e);
  let el = getOrCreate(e);
  let hs = pointers.getPointer(e.pointerId).horizontalSpeed;

  e.preventDefault();

  // Position the element from its middle
  let rect = el.getBoundingClientRect();
  el.style.left = (e.clientX - rect.width / 2) + 'px';
  el.style.top = (e.clientY - rect.height / 2) + 'px';
}

// Returns an existing element for a pointer id, or makes a new one
function getOrCreate(evt) {
  const id = 'pointer-' + evt.pointerId;
  let el = document.getElementById(id);
  if (el) return el;
  el = document.createElement('div');
  el.classList.add('pointer');
  // prevent default gestures in iOS
  el.addEventListener('gesturestart', e => e.preventDefault());
  el.addEventListener('gesturechange', e => e.preventDefault());
  el.addEventListener('gestureend', e => e.preventDefault());


  el.id = id;
  document.body.appendChild(el);
  return el;
}

if (document.readyState != 'loading') onDocumentReady();
else document.addEventListener('DOMContentLoaded', onDocumentReady);