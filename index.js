  let timerDisplay = document.querySelector(".timer");
  let startBtn = document.querySelector(".start");
  let lapBtn = document.querySelector(".lap");
  let restartBtn = document.querySelector(".restart");
  let lapsContainer = document.getElementById("laps");

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let isRunning = false;

  function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);

    return (
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0") + ":" +
      String(milliseconds).padStart(2, "0")
    );
  }

  function updateDisplay() {
    const now = Date.now();
    const timeDiff = now - startTime + elapsedTime;
    timerDisplay.textContent = formatTime(timeDiff);
  }

  startBtn.addEventListener("click", () => {
    if (!isRunning) {
      startTime = Date.now();
      timerInterval = setInterval(updateDisplay, 10);
      startBtn.textContent = "Stop";
      isRunning = true;
    } else {
      clearInterval(timerInterval);
      elapsedTime += Date.now() - startTime;
      startBtn.textContent = "Start";
      isRunning = false;
    }
  });

  lapBtn.addEventListener("click", () => {
    if (!isRunning) return;
    const lapTime = timerDisplay.textContent;
    const li = document.createElement("li");
    li.textContent = "Lap: " + lapTime;
    lapsContainer.appendChild(li);
  });

  restartBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    timerDisplay.textContent = "00:00:00";
    startBtn.textContent = "Start";
    lapsContainer.innerHTML = "";
  });