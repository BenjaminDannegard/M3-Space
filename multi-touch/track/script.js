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

  setInterval(() => {
    displayData();
  }, 100)


}

var chk, chk1, chk2, chk3;
var vab = 0;
var elem = document.getElementById("frontPage");
var elemp1 = document.getElementById("page1");
var elemp2 = document.getElementById("page2");
var elemp3 = document.getElementById("page3");
var onPage = "page1";

function displayData() {
  let g = pointers.createPointerGroupings();
  let text = "";
  if (pointers.numOfPointers > 1)
    var { distance, isApproaching } = pointers.comparePointers(pointers.pointerIds[0], pointers.pointerIds[1]);

  if (g.numOfGroupings > 0) {
    let pg = g.groupings[0];

    if(pointers.currentXpos(pointers.pointerIds[0]) >= 250 && pointers.currentYpos(pointers.pointerIds[0]) <= 100)
    {

      switch (onPage){
        case "page1":
        elem.style.opacity = 0.3;
        elemp1.style.left = "2%";
        elemp1.style.visibility = "visible";
        if(pointers.numOfPointers >= 2 && pg.isMovingLeft == true && onPage == "page1")
        {
          onPage = "page2";
        }
        console.log(onPage);
        break;
        case "page2":
        elemp1.style.visibility = "hidden";
        elemp2.style.left = "2%";
        elemp2.style.visibility = "visible";
        if(pointers.numOfPointers >= 2 && pg.isMovingRight == true && onPage == "page2")
        {
          onPage = "page1";
        }
        if(pointers.numOfPointers >= 2 && pg.isMovingLeft == true && onPage == "page2")
        {
          onPage = "page3";
        }
        break;
        case "page3":
        elemp2.style.visibility = "hidden";
        elemp3.style.left = "2%";
        if(pointers.numOfPointers >= 2 && pg.isMovingRight == true && onPage == "page3")
        {
          onPage = "page2";
        }
        break;
      }

      // //RIGHT SWIPES
      // if(pointers.numOfPointers >= 2 && pg.isMovingRight == true && elemp2.style.visibility == "visible")
      // {
      //   elemp1.style.visibility = "visible";
      //   elemp1.style.left = "2%";
      //   elemp2.style.left = "4%";
      //   elemp3.style.left = "6%";
      // }
      // if(pointers.numOfPointers >= 2 && pg.isMovingRight == true && elemp3.visibility == "visible")
      // {
      //   elemp2.style.visibility = "visible";
      //   elemp2.style.left = "2%";
      //   elemp1.style.left = "4%";
      //   elemp3.style.left = "6%";
      // }
    }
    else{
      elem.style.opacity = 1;
      elemp1.style.visibility = "visible";
      elemp2.style.visibility = "visible";
      elemp3.style.visibility = "visible";
      elemp2.style.left = "6%";
      elemp1.style.left = "4%";
      elemp3.style.left = "8%";
      chk = 0;
      onPage = "page1";
    }


    text = "Moving up: " + pg.isMovingUp + "<br/>" +
      "Moving left: " + pg.isMovingLeft + "<br/>" +
      "Number of groupings: " + g.numOfGroupings + "<br/>" +
      "Horizontal speed: " + Math.round(pg.horizontalSpeed) + "<br/>" +
      "Vertical speed: " + Math.round(pg.verticalSpeed) + "<br/>" +
      "Absolut speed: " + Math.round(pg.speed) + "<br/>" +
      "Num of pointers: " + pointers.numOfPointers + "<br/>" +
      "Distance between 1. & 2. pointers: " + distance + "<br/>" +
      "Pointer 1 & 2 approaching: " + isApproaching;

  }
  document.getElementById("data").innerHTML = text;
}

function onPointerUp(e) {
  pointers.removePointer(e.pointerId);
  let el = getOrCreate(e);
  el.classList.remove('down');
}

function onPointerDown(e) {
  e.preventDefault();
  pointers.updatePointer(e);
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
