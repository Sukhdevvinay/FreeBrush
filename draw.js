const canvas = new fabric.Canvas('canvas');

canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight - 60);

const wrapper = document.querySelector(".canvas-container");
let canvasHeight = canvas.getHeight();

wrapper.addEventListener('scroll', () => {
  const scrollPosition = wrapper.scrollTop + wrapper.clientHeight;
  const scrollHeight = wrapper.scrollHeight;
  if (scrollHeight - scrollPosition < 50) {
    canvasHeight += 250;
    canvas.setHeight(canvasHeight);
    canvas.requestRenderAll();
  }
});

const squareCursor = 'data:image/svg+xml;base64,' + btoa(`
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <rect width="16" height="16" border="black" />
  </svg>
`);

let selected_clr = 'black';
const colorPicker = document.querySelector('.color-picker');
colorPicker.addEventListener('input', (e) => {
    canvas.freeDrawingBrush.color = e.target.value;
    selected_clr = e.target.value;
}); 
let line;
let mousedwn = false;
function switchoffline() {
    canvas.off('mouse:down',startAddingLine);
    canvas.off('mouse:move',startDrawingLine);
    canvas.off('mouse:up',stopDrawingLine);
    canvas.off('mouse:down');
}

function addText() {
  const text = new fabric.IText('Type here', {
    left: 100,
    top: 100,
    fontFamily: 'Arial',
    fill: selected_clr,
    fontSize: 24,
    editable: true
  });
  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.requestRenderAll();
}

function startAddingLine(pos) {
    mousedwn = true;
    let ptr = canvas.getPointer(pos.e);
    line = new fabric.Line([ptr.x,ptr.y,ptr.x,ptr.y],{
        stroke : selected_clr,
        strokeWidth : 5,
        selectable: true,
        evented: true
    })
    canvas.add(line);
    canvas.requestRenderAll();
}
function startDrawingLine(pos) {
    if(mousedwn) {
        let ptr = canvas.getPointer(pos.e);
        line.set({
            x2:ptr.x,
            y2:ptr.y
        });
        canvas.requestRenderAll();
    }
}
function stopDrawingLine() {
    mousedwn = false;
}

function erase() {
  console.log("Eraser");
  switchoffline();
  canvas.defaultCursor = squareCursor;
  canvas.isDrawingMode = false;
  canvas.selection = false;
  canvas.perPixelTargetFind = true;
  canvas.targetFindTolerance = 18;
  canvas.forEachObject(obj => {
    obj.selectable = false;
    obj.evented = true;
  });
  canvas.on('mouse:down', function(e) {
    if (e.target) {
      canvas.remove(e.target);
      canvas.requestRenderAll();
    }
  });
}

function drawline() {
    canvas.isDrawingMode = false;
    canvas.selection = false;
    canvas.on('mouse:down',startAddingLine);
    canvas.on('mouse:move',startDrawingLine);
    canvas.on('mouse:up',stopDrawingLine);
    canvas.forEachObject(obj => obj.selectable = false);
}

function cursor() {
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.defaultCursor = 'pointer';
    canvas.forEachObject(obj => obj.selectable = true);
    switchoffline();
}

function pencil() {
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 3;
    switchoffline();
}
function rhombus() {
    const rhm = new fabric.Rect({
        left: 100,
        top: 100,
        fill: selected_clr,
        width: 20,
        height: 20,
        angle: 45
    });
    canvas.add(rhm);
    switchoffline();
}
 
function drawRect() {
    const rect = new fabric.Rect({
        left:100,
        top:100,
        fill:selected_clr,
        width:35,
        height:60
    });
    canvas.add(rect);
    canvas.isDrawingMode = false;
    switchoffline();
}
function drawSqr() {
    const sqr = new fabric.Rect({
        left: 250,
        top: 100,
        height:50,
        width:50,
        fill: selected_clr
    });
    canvas.add(sqr);
    canvas.isDrawingMode = false;
    switchoffline();
}
function drawCircle() {
    const circle = new fabric.Circle({
        left: 250,
        top: 100,
        radius: 50,
        fill: selected_clr
    });
    canvas.add(circle);
    canvas.isDrawingMode = false;
    switchoffline();
}
function drawTriangle() {
  const triangle = new fabric.Triangle({
    left: 150,
    top: 150,
    width: 100,
    height: 100,
    fill: selected_clr, 
  });
  canvas.add(triangle);
  canvas.isDrawingMode = false;
  switchoffline();
}
function drawRightAngleTriangle() {
  const triangle = new fabric.Polygon([
    { x: 0, y: 0 },   
    { x: 0, y: 100 }, 
    { x: 100, y: 100} 
  ], {
    left: 250,
    top: 180,
    fill: selected_clr,
    stroke: selected_clr,
    strokeWidth: 1
  });
  canvas.add(triangle);
  canvas.isDrawingMode = false;
  switchoffline();
}
