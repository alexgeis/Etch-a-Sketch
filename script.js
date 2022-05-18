const colorPicker = document.querySelector("#colorPicker");
const buttons = document.querySelectorAll("button");
const btnColor = document.querySelector("#btnColor");
const btnRandom = document.querySelector("#btnRandom");
const btnEraser = document.querySelector("#btnEraser");
const btnClear = document.querySelector("#btnClear");
const gridValue = document.querySelector("#gridValue");
const gridSlider = document.querySelector("#gridSlider");
const grid = document.querySelector("#grid");
const gridEls = document.querySelectorAll(".grid-element");

//animation selectors
const circle1 = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");

//date
const currentYear = document.getElementById("currentYear");
currentYear.textContent = new Date().getFullYear();

//defaults
const DEFAULT_COLOR = "#333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

//state variables
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

//state update functions
function setCurrentColor(newColor) {
  currentColor = newColor;
}
function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}
function setCurrentSize(newSize) {
  currentSize = newSize;
}

// HELPER FUNCTIONS
function hasClass(el, className) {
  return el.classList
    ? el.classList.contains(className)
    : new RegExp("\\b" + className + "\\b").test(el.className);
}
function addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) el.className += " " + className;
}
function removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else
    el.className = el.className.replace(
      new RegExp("\\b" + className + "\\b", "g"),
      ""
    );
}
/*
 REGEX EXPLAINED
 \ = reg ex boundaries
 \b = word boundaries
 g = global search
*/

//button event listeners
btnColor.addEventListener("click", setCurrentMode("color"));
btnRandom.addEventListener("click", setCurrentMode("random"));
btnEraser.addEventListener("click", setCurrentMode("eraser"));
colorPicker.addEventListener("change", function (e) {
  setCurrentColor(e.target.value);
});
gridSlider.addEventListener("mousemove", function (e) {
  updateSizeText(e.target.value);
});
gridSlider.addEventListener("change", function (e) {
  changeSize(e.target.value);
});

//registering mousedown/up state variable w/ body object
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//button functions
function activateButton(newMode) {
  removeActive();
}
function updateActiveButton(e) {
  if (e.target.id === "btnClear") {
    //prevent clear button from being styled upon click
    removeActive();
    btnClear.style.backgroundColor = "#ededed";
    btnClear.style.color = "#333";
    btnClear.style.transform = "scale(1.00)";
    clearGrid();
    addClass(btnColor, "active");
  } else {
    removeActive();
    activeButton(e);
  }
}

function removeActive() {
  for (let button of Array.from(buttons)) {
    if (hasClass(button, "active")) {
      removeClass(button, "active");
    }
  }
}

function activeButton(e) {
  e.preventDefault();
  addClass(e.target, "active");
}

//grid functions
function updateSizeText() {
  gridValue.textContent = `${value} x ${value}`;
}
function updateGridEl(e) {
  e.stopPropagation();
  let element = e.target;
  let chosenColor = colorPicker.value;
  if (element.style.backgroundColor !== chosenColor)
    element.style.backgroundColor = chosenColor;
  else if (element.style.backgroundColor === chosenColor)
    element.style.backgroundColor = "#fefefe";
}

function clearGrid() {
  for (let gridEl of Array.from(gridEls)) {
    gridEl.style.backgroundColor = "#fefefe";
  }
}

//Functions to make
let gridSize = 16;
grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
let gridCellArr = [];
const gridCell = document.createElement("div");
// addClass(gridCell, "grid-element");
for (let i = 0; i < gridSize; i++) {
  gridCellArr.push(gridCell);
}
console.log(gridCellArr);
grid.append(...gridCellArr);

//grid event listeners
for (let gridEl of Array.from(gridEls)) {
  gridEl.addEventListener("click", updateGridEl);
  addClass(gridEl, "grid-element");
  // .addEventListener("mouseup",stopUpdateGridEl)
}

// 16x16 grid
// javascript Dom manipulation to
//add this 16x16 grid to the #grid element .appendChild()
// add class grid-element
// add event listeners
//  e.target.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

//change grid size

// function setupGrid(size) {
//     grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
//     grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

//     for (let i = 0; i < size * size; i++) {
//       const gridElement = document.createElement('div')
//       gridElement.classList.add("grid-element")
//       gridElement.addEventListener('mouseover', changeColor)
//       gridElement.addEventListener('mousedown', changeColor)
//       grid.appendChild(gridElement)
//     }
//   }

//   function changeColor(e) {
//     if (e.type === 'mouseover' && !mouseDown) return
//     if (currentMode === 'rainbow') {
//       const randomR = Math.floor(Math.random() * 256)
//       const randomG = Math.floor(Math.random() * 256)
//       const randomB = Math.floor(Math.random() * 256)
//       e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
//     } else if (currentMode === 'color') {
//       e.target.style.backgroundColor = currentColor
//     } else if (currentMode === 'eraser') {
//       e.target.style.backgroundColor = '#fefefe'
//     }
//   }
