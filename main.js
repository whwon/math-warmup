let firstNumber,
  secondNumber,
  operation = "addition",
  operator = "+",
  currentIndex = 1,
  amountAnswered = 0,
  points = 0;

const OPERATIONS = {
  ADDITION: "+",
  SUBTRACTION: "-",
  MULTIPLICATION: "*",
  DIVISION: "/",
};

function mapNumbers(mapOfNumbers) {
  for (let i = 0; i < 101; i++) {
    let randomNumber = generateRandomNumber();
    mapOfNumbers.set(i, randomNumber);
  }

  return mapOfNumbers;
}

function generateRandomNumber(range = 99) {
  return Math.floor(Math.random() * range) + 1;
}

function setNumber(index) {
  document.getElementById("firstNumber").innerHTML = firstNumber.get(index);
  document.getElementById("secondNumber").innerHTML = secondNumber.get(index);
}

function getAnswer(inputtedAnswer) {
  const correctAnswer = eval(`${firstNumber.get(currentIndex)} ${operator} ${secondNumber.get(currentIndex)}`);
  if (Number(inputtedAnswer) === Number(correctAnswer)) {
    points += 1;
  }
  document.getElementById("answer").value = "";
  amountAnswered += 1;
  currentIndex += 1;
  setNumber(currentIndex);
}

function setUp() {}

function reset() {}

function countDown() {
  const stopWatch = document.getElementById("stopWatch");
  // 1 minute to solve the problem
  let countDownTime = 61;
  const countdownInterval = setInterval(function () {
    // decrement the countdown time by 1 second
    countDownTime--;

    // display the updated countdown value
    stopWatch.innerHTML = countDownTime;

    // check if the countdown has reached zero
    if (countDownTime === 0) {
      // stop the countdown interval
      clearInterval(countdownInterval);

      // display a message indicating that the countdown has ended
      stopWatch.innerHTML = "!";
      // display the scoreboard modal
      const scoreboardModal = document.getElementById("scoreboard-modal");
      scoreboardModal.style.display = "block";
      document.getElementById("score").innerHTML = `${points} / ${amountAnswered}`;
      const percentage = (points / amountAnswered) * 100;
      document.getElementById("percent").innerHTML = `${percentage > 0 ? percentage.toFixed(2) : 0}%`;
    }
  }, 1000);
}

function getReadyCountDown(e) {
  e.preventDefault();
  const stopWatch = document.getElementsByClassName("ready-count")[0];

  operator = document.querySelector("select option:checked").value;

  stopWatch.style.display = "block";
  document.getElementById("welcome").style.display = "none";
  // 1 minute to solve the problem
  let countDownTime = 6;
  const countdownInterval = setInterval(function () {
    // decrement the countdown time by 1 second
    countDownTime--;

    // display the updated countdown value
    stopWatch.innerHTML = countDownTime;

    // check if the countdown has reached zero
    if (countDownTime === 0) {
      // stop the countdown interval
      clearInterval(countdownInterval);
      stopWatch.style.display = "none";

      start();
    }
  }, 1000);
}

function start() {
  document.getElementsByClassName("main")[0].style.display = "flex";
  document.getElementById("operation").style.display = "flex";
  document.getElementById("answer").style.display = "block";
  document.getElementById("answer").focus();
  setNumber(currentIndex);
  countDown();
}

(function () {
  firstNumber = mapNumbers(new Map());
  secondNumber = mapNumbers(new Map());
})();

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getAnswer(document.getElementById("answer").value);
  }
});
