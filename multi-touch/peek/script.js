function onDocumentReady() {
    let el = document.body;
  
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);
  }
  
  let distanceOnPointerDown = 2;

  function setSplitPercent (percent) {
    // snap if percent is less than 10
    let split = document.getElementById("split");
    if (percent < 10) {
      split.style.borderStyle = "hidden";
      percent = 0;
    }
    else
      split.style.borderStyle = "solid";
    split.style.height = `${percent}%`;
    document.getElementById("layer0").style.height = `${(100-percent)/2}%`;
    document.getElementById("layer1").style.height = `${(100-percent)/2}%`;
  }

  function onPointerUp(e) {
    pointers.removePointer(e.pointerId);
    setSplitPercent(0);
  }
  
  function onPointerDown(e) {
    e.preventDefault();
    pointers.updatePointer(e);
    if (pointers.numOfPointers == 2) {
      let id1 = pointers.pointerIds[0], id2 = pointers.pointerIds[1];
      let { distance } = pointers.comparePointers(id1, id2);
      distanceOnPointerDown = distance;
    }
  }
  
  function onPointerLeave(e) {
    pointers.removePointer(e.pointerId);
    setSplitPercent(0);
  }
  
  function onPointerMove(e) {
    pointers.updatePointer(e);  

    if (pointers.numOfPointers == 2) {
        let { height, width } = document.body.getBoundingClientRect();
        let id1 = pointers.pointerIds[0], id2 = pointers.pointerIds[1];
        let { distance } = pointers.comparePointers(id1, id2);

      if (distanceOnPointerDown > 150) 
          distanceOnPointerDown = distance
        else 
          setSplitPercent((distance/height)*100);
    }

  }
  
  
  if (document.readyState != 'loading') onDocumentReady();
  else document.addEventListener('DOMContentLoaded', onDocumentReady);
  