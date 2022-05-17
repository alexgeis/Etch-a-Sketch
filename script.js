const colorPicker = document.querySelector("#colorPicker");
const buttons = document.querySelectorAll("button");
const btnColor = document.querySelector("#btnColor");
const btnRainbow = document.querySelector("#btnRainbow");
const btnEraser = document.querySelector("#btnEraser");
const btnClear = document.querySelector("#btnClear");
const gridSlider = document.querySelector("#gridSlider");
const circle1 = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");
const grid = document.querySelector("#grid");
const gridEls = document.querySelectorAll(".grid-element");
const currentYear = document.getElementById("currentYear");

currentYear.textContent = new Date().getFullYear();

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

  /*
   REGEX EXPLAINED
   \ = reg ex boundaries
   \b = word boundaries
   g = global search
*/
}

// document.body.addEventListener("click", print);
// function print(e) {
//   console.log(e);
// }

//button event listeners
for (let button of Array.from(buttons)) {
  button.addEventListener("click", updateActiveButton);
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

//grid event listeners
for (let gridEl of Array.from(gridEls)) {
  gridEl.addEventListener("click", updateGridEl);
  // .addEventListener("mouseup",stopUpdateGridEl)
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
let gridCellArr = [];
const gridCell = document.createElement("div");
addClass(gridCell, "grid-element");
for (let i = 0; i < gridSize; i++) {
  gridCellArr.push(gridCell);
}
grid.append(...gridCellArr);
// 16x16 grid
// javascript Dom manipulation to
//add this 16x16 grid to the #grid element .appendChild()
// add class grid-element
// add event listeners
//  e.target.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`

//change grid size
