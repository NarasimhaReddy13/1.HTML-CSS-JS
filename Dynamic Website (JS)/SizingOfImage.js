let imageElement = document.getElementById("image");
let increaseSizeEl = document.getElementById("incrementButton");
let decreaseSizeEl = document.getElementById("decrementButton");
let warningMessageEl = document.getElementById("warningMessage");
let imageWidthEl = document.getElementById("imageWidth");

let defaultImageWidth = 200;
let minImageWidth = 100;
let maxImageWidth = 300;
imageElement.style.width = defaultImageWidth + "px";
imageWidthEl.textContent = defaultImageWidth + "px";


let warningMsgMin = "Can't Visible";
let warningMsgMax = "Too Big";

function onIncrement() {
    if (defaultImageWidth >= maxImageWidth) {
        warningMessageEl.textContent = warningMsgMax;
    } else {
        defaultImageWidth = defaultImageWidth + 5;
        let updatedImageWidth = defaultImageWidth + "px";

        warningMessageEl.textContent = "";
        imageElement.style.width = updatedImageWidth;
        imageWidthEl.textContent = updatedImageWidth;
    }
}

function onDecrement() {
    if (defaultImageWidth <= minImageWidth) {
        warningMessageEl.textContent = warningMsgMin;
    } else {
        defaultImageWidth = defaultImageWidth - 5;
        let updatedImageWidth = defaultImageWidth + "px";

        warningMessageEl.textContent = "";
        imageElement.style.width = updatedImageWidth;
        imageWidthEl.textContent = updatedImageWidth;
    }
}





let aboutButtonEl = document.getElementById("aboutButton");
let timeToVisitButtonEl = document.getElementById("timeToVisitButton");
let aboutTabEl = document.getElementById("aboutTab");
let timeToVisitTabEl = document.getElementById("timeToVisitTab");

timeToVisitTabEl.classList.add("d-none");

function about() {
    aboutTabEl.classList.remove("d-none");
    timeToVisitTabEl.classList.add("d-none");

    aboutButtonEl.classList.add("selected-button");
    timeToVisitButtonEl.classList.remove("selected-button");
}

function timeToVisit() {
    aboutTabEl.classList.add("d-none");
    timeToVisitTabEl.classList.remove("d-none");

    aboutButtonEl.classList.remove("selected-button");
    timeToVisitButtonEl.classList.add("selected-button");
}
