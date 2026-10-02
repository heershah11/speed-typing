const WORDS = ("time year people way day man thing woman life child world school state family student group country " +
  "problem hand part place case week company system program question work government number night point home water " +
  "room mother area money story fact month lot right study book eye job word business issue side kind head house " +
  "service friend father power hour game line end member law car city community name team minute idea body").split(" ");

const DURATION = 30;

const textEl = document.getElementById("text");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accEl = document.getElementById("acc");
const hintEl = document.getElementById("hint");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let chars, index, typed, errors, timeLeft, timer, started, finished;

function randomText(count = 80) {
  return Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)]).join(" ");
}

function reset() {
  clearInterval(timer);
  const text = randomText();
  textEl.innerHTML = "";
  chars = [...text].map((c) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = c;
    textEl.appendChild(span);
    return span;
  });
  index = 0; typed = 0; errors = 0;
  timeLeft = DURATION; started = false; finished = false;
  chars[0].classList.add("current");
  textEl.scrollTop = 0;
  timeEl.textContent = DURATION;
  wpmEl.textContent = 0;
  accEl.textContent = 100;
  resultEl.hidden = true;
  hintEl.hidden = false;
  textEl.focus();
}

function stats() {
  const minutes = (DURATION - timeLeft) / 60 || 1 / 60;
  const correct = typed - errors;
  return {
    wpm: Math.round(correct / 5 / minutes),
    acc: typed ? Math.round((correct / typed) * 100) : 100,
  };
}

function update() {
  const s = stats();
  wpmEl.textContent = s.wpm;
  accEl.textContent = s.acc;
}

function start() {
  started = true;
  hintEl.hidden = true;
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    update();
    if (timeLeft <= 0) finish();
  }, 1000);
}

function finish() {
  clearInterval(timer);
  finished = true;
  const s = stats();
  document.getElementById("r-wpm").textContent = s.wpm;
  document.getElementById("r-acc").textContent = s.acc;
  resultEl.hidden = false;
  chars[index]?.classList.remove("current");
}

function scrollToCurrent() {
  const el = chars[index];
  if (el && el.offsetTop - textEl.scrollTop > textEl.clientHeight - 60) {
    textEl.scrollTop = el.offsetTop - 40;
  }
}

document.addEventListener("keydown", (e) => {
  if (finished || e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === "Backspace") {
    if (index > 0) {
      chars[index].classList.remove("current");
      index--;
      chars[index].classList.remove("correct", "wrong");
      chars[index].classList.add("current");
    }
    e.preventDefault();
    return;
  }

  if (e.key.length !== 1) return;
  e.preventDefault();
  if (!started) start();

  const expected = chars[index].textContent;
  chars[index].classList.remove("current");
  typed++;
  if (e.key === expected) {
    chars[index].classList.add("correct");
  } else {
    chars[index].classList.add("wrong");
    errors++;
  }
  index++;

  if (index >= chars.length) return finish();
  chars[index].classList.add("current");
  scrollToCurrent();
  update();
});

textEl.addEventListener("focus", () => textEl.classList.add("active"));
textEl.addEventListener("blur", () => textEl.classList.remove("active"));
restartBtn.addEventListener("click", reset);

reset();
