const colorPicker = document.querySelector("#colorPicker");
const buttons = document.querySelectorAll("button");
const btnColor = document.querySelector("#btnColor");
const btnRainbow = document.querySelector("#btnRainbow");
const btnEraser = document.querySelector("#btnEraser");
const btnClear = document.querySelector("#btnClear");
const gridSlider = document.querySelector("#gridSlider");
const circle1 = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");
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

document.body.addEventListener("click", print);
function print(e) {
  console.log(e);
}

//add event listeners to all buttons
for (let button of Array.from(buttons)) {
  button.addEventListener("click", updateActiveButton);
}

function updateActiveButton(e) {
  if (e.target.id === "buttonClear") {
    removeActive();
    // clearGrid();
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
  console.log(e);
  addClass(e.target, "active");
}
