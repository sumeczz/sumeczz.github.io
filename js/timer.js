const timeEl = document.getElementById("ride-time");
let startTime, interval;

export function initTimer() {
  startTime = Date.now();
  interval = setInterval(updateTime, 1000);
}

function updateTime() {
  const elapsed = Date.now() - startTime;
  const seconds = Math.floor(elapsed / 1000) % 60;
  const minutes = Math.floor(elapsed / 60000) % 60;
  const hours = Math.floor(elapsed / 3600000);

  timeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function resetTimer() {
  clearInterval(interval);
  timeEl.textContent = "00:00:00";
}

export function getElapsedTime() {
  return (Date.now() - startTime) / 1000;
}

function pad(n) {
  return n.toString().padStart(2, '0');
}
