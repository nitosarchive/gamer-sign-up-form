const checklist = document.querySelector(".checklist");
const checkCount = document.getElementById("currentCheck");
const concurrentName = document.getElementById("name");
const userInput = document.getElementById("userInput");
let checkTally = 0;
let userTally = false;
let emailTally = false;
const allInputs = document.querySelectorAll("input");
const userInvalid = document.getElementById("userInvalid");
const userDirections = document.getElementById("userDirections");
const emailInvalid = document.getElementById("emailInvalid");
const passwordInvalid = document.getElementById("passwordInvalid");
const passDirections = document.getElementById("passDirections");
const retypeInvalid = document.getElementById("retypeInvalid");
const termsInvalid = document.getElementById("termsInvalid");
const emailInput = document.getElementById("emailInput");

function completeness() {
  if (checkTally === 5) {
    checklist.classList.remove("incomplete");
    checklist.classList.add("complete");
  } else if (checklist.classList.contains("complete") && checkTally != 5) {
    checklist.classList.remove("complete");
    checklist.classList.add("incomplete");
  }
}

function userInputEvent() {
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

function emailValidation(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function emailInputEvent() {
  if (emailValidation(emailInput.value) && emailTally === false) {
    emailTally = true;
    checkTally++;

    checkCount.innerText = checkTally;
  } else if (emailTally === true && !emailValidation(emailInput.value)) {
    emailTally = false;
    checkTally--;

    checkCount.innerText = checkTally;
  }
  emailValidation(emailInput.value);
  completeness();
}

emailInput.addEventListener("input", emailInputEvent);

userInput.addEventListener("input", userInputEvent);
