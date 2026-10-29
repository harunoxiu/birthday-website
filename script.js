
/* =====================================
   BIRTHDAY COUNTDOWN
   October 30, 2026 — Philippine time
===================================== */

const birthdayDate = new Date("2026-10-30T00:00:00+08:00");

const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

const surpriseButton = document.getElementById("surprise-button");
const countdownNote = document.getElementById("countdown-note");

function updateCountdown() {
  const remaining = birthdayDate.getTime() - Date.now();

  if (remaining <= 0) {
    hoursDisplay.textContent = "00";
    minutesDisplay.textContent = "00";
    secondsDisplay.textContent = "00";

    surpriseButton.disabled = false;
    surpriseButton.classList.add("unlocked");
    surpriseButton.textContent = "♥ OPEN YOUR SURPRISE ♥";

    countdownNote.textContent = "It's finally your special day! ♡";

    clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  // No DAYS box: show the total remaining hours.
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");

  surpriseButton.disabled = true;
  surpriseButton.classList.remove("unlocked");
  surpriseButton.textContent = "🔒 Pwede wait??";
}

surpriseButton.addEventListener("click", () => {
  if (Date.now() >= birthdayDate.getTime()) {
    window.location.href = "messages.html";
  }
});

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);


/* =====================================
   FALLING POMPOMPURIN + HEARTS
===================================== */

const fallingLayer = document.getElementById("falling-layer");

// The first filename matches the transparent PNG download.
// The second is a fallback if you renamed the image.
const pompomImagePaths = [
  "./pompompurin_transparent.png",
  "./pompompurin.png"
];

let workingPompomPath = pompomImagePaths[0];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createFallingItem() {
  if (!fallingLayer) return;

  const isPompom = Math.random() < 0.42;
  const item = document.createElement("div");

  item.className = "falling-item";

  const duration = randomBetween(7, 14);
  const sway = randomBetween(20, 75) * (Math.random() < 0.5 ? -1 : 1);
  const rotation = randomBetween(-25, 25);

  item.style.left = randomBetween(2, 96) + "vw";
  item.style.setProperty("--duration", duration + "s");
  item.style.setProperty("--sway", sway + "px");
  item.style.setProperty("--start-rotation", rotation + "deg");
  item.style.setProperty(
    "--middle-rotation",
    randomBetween(-25, 25) + "deg"
  );
  item.style.setProperty(
    "--end-rotation",
    randomBetween(-35, 35) + "deg"
  );

  if (isPompom) {
    // Pompompurin in a variety of sizes
    const image = document.createElement("img");

    image.className = "falling-pompom";
    image.alt = "";
    image.draggable = false;

    const size = randomBetween(38, 88);
    item.style.width = size + "px";

    image.src = workingPompomPath;

    image.addEventListener("error", () => {
      // If the downloaded image has the alternate filename, try it.
      const nextPath = pompomImagePaths.find(
        path => path !== image.getAttribute("src")
      );

      if (nextPath && !image.dataset.triedFallback) {
        image.dataset.triedFallback = "true";
        image.src = nextPath;
      } else {
        console.error(
          "Pompompurin image couldn't load. Check the images folder and filename."
        );
        item.remove();
      }
    });

    image.addEventListener("load", () => {
      workingPompomPath = image.src;
    });

    item.appendChild(image);
  } else {
    // A mix of pink, purple, and white hearts
    item.classList.add("falling-heart");
    item.textContent = Math.random() < 0.5 ? "♥" : "♡";

    const heartSize = randomBetween(14, 36);

    item.style.setProperty("--heart-size", heartSize + "px");
    item.style.setProperty(
      "--heart-color",
      [
        "#ff3f91",
        "#ff78bd",
        "#b65cff",
        "#8d58ed",
        "#ffffff"
      ][Math.floor(Math.random() * 5)]
    );

    item.style.setProperty(
      "--item-opacity",
      randomBetween(0.65, 1)
    );
  }

  fallingLayer.appendChild(item);

  // Remove each item after it falls off-screen.
  item.addEventListener("animationend", () => {
    item.remove();
  });
}

// Start with a small burst of mixed items.
for (let i = 0; i < 15; i++) {
  setTimeout(createFallingItem, i * 230);
}

// Keep the animation going without creating too many elements.
setInterval(createFallingItem, 420);


/* =====================================
   CUSTOM HEART CURSOR + TRAIL
===================================== */

const heartCursor = document.getElementById("heart-cursor");

const canUseCustomCursor = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (heartCursor && canUseCustomCursor) {
  heartCursor.style.display = "block";

  document.addEventListener("mousemove", event => {
    heartCursor.style.left = event.clientX + "px";
    heartCursor.style.top = event.clientY + "px";
  });

  let lastTrailTime = 0;

  document.addEventListener("mousemove", event => {
    const now = Date.now();

    if (now - lastTrailTime < 75) return;
    lastTrailTime = now;

    const trail = document.createElement("span");

    trail.className = "cursor-trail";
    trail.textContent = Math.random() < 0.5 ? "♥" : "♡";
    trail.style.left = event.clientX + "px";
    trail.style.top = event.clientY + "px";
    trail.style.fontSize = randomBetween(9, 19) + "px";

    document.body.appendChild(trail);

    trail.addEventListener("animationend", () => {
      trail.remove();
    });
  });
}
