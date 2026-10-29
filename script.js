
/* ===== COUNTDOWN ===== */
const birthdayDate = new Date("2026-10-30T00:00:00+08:00");

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const surpriseButton = document.getElementById("surprise-button");

function updateCountdown() {
  const remaining = birthdayDate.getTime() - Date.now();

  if (remaining <= 0) {
    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";

    surpriseButton.disabled = false;
    surpriseButton.classList.add("unlocked");
    surpriseButton.textContent = "♥  OPEN YOUR SURPRISE";

    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");

  surpriseButton.disabled = true;
  surpriseButton.classList.remove("unlocked");
  surpriseButton.textContent = "🔒  WAIT FOR YOUR SURPRISE";
}

updateCountdown();
setInterval(updateCountdown, 250);

/* ===== OPEN SECOND PAGE ===== */
surpriseButton.addEventListener("click", () => {
  if (Date.now() >= birthdayDate.getTime()) {
    window.location.href = "messages.html";
  }
});

/* ===== FALLING HEARTS ===== */
const heartsBackground = document.getElementById("hearts-background");

if (heartsBackground) {
  const symbols = ["♥", "♡", "💕", "💗", "💖"];

  function createFallingHeart() {
    const heart = document.createElement("span");

    heart.className = "falling-heart";
    heart.textContent = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 23 + "px";
    heart.style.animationDuration = 6 + Math.random() * 7 + "s";

    heartsBackground.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }

  for (let i = 0; i < 18; i++) {
    setTimeout(createFallingHeart, i * 180);
  }

  setInterval(createFallingHeart, 400);
}

/* ===== CUSTOM HEART CURSOR ===== */
const heartCursor = document.getElementById("heart-cursor");

if (
  heartCursor &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  let lastTrail = 0;

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    heartCursor.style.left = `${x}px`;
    heartCursor.style.top = `${y}px`;

    if (performance.now() - lastTrail > 120) {
      lastTrail = performance.now();

      const trail = document.createElement("span");
      trail.className = "cursor-trail";
      trail.textContent = Math.random() > 0.5 ? "♥" : "♡";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      trail.style.fontSize = `${10 + Math.random() * 10}px`;

      document.body.appendChild(trail);
      trail.addEventListener("animationend", () => trail.remove());
    }
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest("button, a")) {
      heartCursor.classList.add("hovering");
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.closest("button, a")) {
      heartCursor.classList.remove("hovering");
    }
  });
}
