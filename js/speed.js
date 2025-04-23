let rideStartTime = null; // Čas začátku jízdy
let elapsedTime = 0; // Uplynulý čas v sekundách
let timerInterval = null; // Interval pro aktualizaci času

const rideTimeEl = document.getElementById("ride-time"); // Element pro čas jízdy

export function startTimer() {
  rideStartTime = Date.now(); // Získání aktuálního času, kdy jízda začíná
  timerInterval = setInterval(updateTime, 1000); // Aktualizace každou sekundu
}

export function updateTime() {
  if (rideStartTime !== null) {
    elapsedTime = Math.floor((Date.now() - rideStartTime) / 1000); // Výpočet uplynulého času v sekundách
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    rideTimeEl.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }
}

export function stopTimer() {
  clearInterval(timerInterval); // Zastavení časovače
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}
