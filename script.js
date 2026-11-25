const checklist = document.querySelector(".checklist");
const checkCount = document.getElementById("currentCheck");
const concurrentName = document.getElementById("name");
const userInput = document.getElementById("userInput");
let checkTally = 0;
let userTally = false;
const allInputs = document.querySelectorAll("input");

function completeness() {
  if (checkTally === 5) {
    checklist.classList.remove("incomplete");
    checklist.classList.add("complete");
  } else if (checklist.classList.contains("complete") && checkTally != 5) {
    checklist.classList.remove("complete");
    checklist.classList.add("incomplete");
  }
}

function inputEvent() {
  if (userInput.value.length > 20) {
    return;
  }
  if (userInput.value.length === 0) {
    concurrentName.innerText = "unassigned";
  }

  if (userInput.value.length >= 3 && userTally === false) {
    userTally = true;
    checkTally++;

    checkCount.innerText = checkTally;
  } else if (userTally === true && userInput.value.length < 3) {
    userTally = false;
    checkTally--;

    checkCount.innerText = checkTally;
  }
  concurrentName.innerText = userInput.value;

  completeness();
}

userInput.addEventListener("input", inputEvent);
