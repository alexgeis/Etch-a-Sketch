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
  updateSize(e.target.value);
});
//grid event listeners
for (let gridEl of Array.from(gridEls)) {
  gridEl.addEventListener("click", updateGridEl);
  addClass(gridEl, "grid-element");
}

//registering mousedown/up state variable w/ body object
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//button function
function activateButton(newMode) {
  //remove 'active' class
  if (currentMode === "color") {
    removeClass(btnRandom, "active");
  } else if (currentMode === "random") {
    removeClass(btnColor, "active");
  } else if (currentMode === "eraser") {
    removeClass(btnEraser, "active");
  }
  //add 'active' class
  if (newMode === "random") {
    addClass(btnRandom, "active");
    btnRandom.classList.add("active");
  } else if (newMode === "color") {
    addClass(btnColor, "active");
  } else if (newMode === "eraser") {
    addClass(btnEraser, "active");
  }
}

//grid functions
function updateSize(value) {
  setCurrentSize(value);
  updateSizeText(value);
  reloadGrid();
}

function updateSizeText(value) {
  gridValue.textContent = `${value} x ${value}`;
}

function reloadGrid() {
  clearGrid();
  setupGrid(currentSize);
}

function clearGrid() {
  for (let gridEl of Array.from(gridEls)) {
    gridEl.style.backgroundColor = "#fefefe";
  }
  //   grid.innerHTML = ''
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid-element");
    gridElement.addEventListener("mouseover", changeColor);
    gridElement.addEventListener("mousedown", changeColor);
    grid.appendChild(gridElement);
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "random") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#fefefe";
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  activateButton(DEFAULT_MODE);
};
