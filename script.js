const checklist = document.querySelector(".checklist");
const checkCount = document.getElementById("currentCheck");
const concurrentName = document.getElementById("name");
const userInput = document.getElementById("userInput");
let checkTally = 0;
let userTally = false;
let emailTally = false;
let passwordTally = false;
let retypeTally = false;
let checkboxTally = false;
const allInputs = document.querySelectorAll("input");
const userInvalid = document.getElementById("userInvalid");
const userDirections = document.getElementById("userDirections");
const emailInvalid = document.getElementById("emailInvalid");
const passwordInvalid = document.getElementById("passwordInvalid");
const passDirections = document.getElementById("passDirections");
const retypeInvalid = document.getElementById("retypeInvalid");
const termsInvalid = document.getElementById("termsInvalid");
const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");
const retypeInput = document.getElementById("retypeInput");
const checkbox = document.getElementById("termsCheck");
const strength = document.getElementById("strength");
const strengthBar = strength.querySelectorAll("span");
let bars = 0;
const passStrength = document.getElementById("passStrength");
passStrength.style.textTransform = "uppercase";
function concealment(x) {
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function strengthAssess() {
  let barProgression = 0;
  strengthBar.forEach((bar) => {
    if (bars <= barProgression) {
      bar.style.background = "rgb(48, 61, 75)";
      return;
    } else if (bars === 1) {
      passStrength.innerText = "weak";
      bar.style.background = "rgb(255, 131, 122)";
      passStrength.style.color = "rgb(255, 131, 122)";
    } else if (bars === 2) {
      bar.style.background = "rgb(255, 195, 77)";
      passStrength.innerText = "Mild";
      passStrength.style.color = "rgb(255, 195, 77)";
    } else if (bars === 3) {
      bar.style.background = "rgb(128, 166, 33)";
      passStrength.innerText = "Fair";
      passStrength.style.color = "rgb(128, 166, 33)";
    } else if (bars === 4) {
      bar.style.background = "rgb(191, 245, 56)";
      passStrength.innerText = "Strong";
      passStrength.style.color = "rgb(191, 245, 56)";
    }
    barProgression++;
  });
}

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("concealed") ||
    e.target.classList.contains("unconcealed")
  ) {
    e.preventDefault();
  } else return;

  if (e.target.classList.contains("concealed")) {
    const elm = e.target.previousSibling.previousSibling;
    e.target.classList.remove("concealed");
    e.target.classList.add("unconcealed");
    concealment(elm);
  } else if (e.target.classList.contains("unconcealed")) {
    const elm = e.target.previousSibling.previousSibling;
    e.target.classList.remove("unconcealed");
    e.target.classList.add("concealed");
    concealment(elm);
  } else return "Error";
});

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
  } else if (userTally === true && userInput.value.length < 3) {
    userTally = false;
    checkTally--;
  }
  checkCount.innerText = checkTally;
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
  } else if (emailTally === true && !emailValidation(emailInput.value)) {
    emailTally = false;
    checkTally--;
  }

  checkCount.innerText = checkTally;
  completeness();
}

function passwordInputEvent() {
  if (passInput.value.length <= 8) {
    bars = Math.floor(passInput.value.length / 2);
  }

  if (passInput.value.length >= 8 && passwordTally === false) {
    passwordTally = true;
    checkTally++;
  } else if (passwordTally === true && passInput.value.length < 8) {
    passwordTally = false;
    checkTally--;
  }
  checkCount.innerText = checkTally;
  strengthAssess();
  completeness();
}

function retypeInputEvent() {
  if (
    passInput.value.length >= 8 &&
    passInput.value === retypeInput.value &&
    retypeTally === false
  ) {
    retypeTally = true;
    checkTally++;
  } else if (
    (passInput.value.length < 8 && retypeTally === true) ||
    (passInput.value != retypeInput.value && retypeTally === true)
  ) {
    retypeTally = false;
    checkTally--;
  }
  checkCount.innerText = checkTally;
  completeness();
}

function checkboxEvent() {
  if (checkbox.checked && checkboxTally === false) {
    checkboxTally = true;
    checkTally++;
  } else {
    checkboxTally = false;
    checkTally--;
  }
  checkCount.innerText = checkTally;

  completeness();
}

checkbox.addEventListener("click", checkboxEvent);

retypeInput.addEventListener("input", retypeInputEvent);

passInput.addEventListener("input", passwordInputEvent);

emailInput.addEventListener("input", emailInputEvent);

userInput.addEventListener("input", userInputEvent);
