import { hasClass, addClass, removeClass } from "./assets/js/helpers";

const colorPicker = document.querySelector("#colorPicker");
const buttons = document.querySelectorAll("button");
const btnColor = document.querySelector("#btnColor");
const btnRainbow = document.querySelector("#btnRainbow");
const btnEraser = document.querySelector("#btnEraser");
const btnClear = document.querySelector("#btnClear");
const gridSlider = document.querySelector("#gridSlider");
const circle1 = document.querySelector("#circle1");
const circle2 = document.querySelector("#circle2");

// document.body.addEventListener("click", print);

function print(e) {
  console.log(e);
}

buttons.addEventListener("click", activeButton);

function activeButton(e) {}
