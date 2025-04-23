import { startTimer, stopTimer, updateTime } from './speed.js';
import { updateDistance } from './distance.js';

let isRunning = false;
let rideStatusEl = document.getElementById('ride-status');
let speedDisplayEl = document.getElementById('speed-display');
let maxSpeed = 0;
let avgSpeed = 0;
let totalDistance = 0;

// Funkce pro start/stop jízdy
document.getElementById('pause-btn').addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
    rideStatusEl.textContent = '🟠 Jízda pozastavena';
    isRunning = false;
  } else {
    startTimer();
    rideStatusEl.textContent = '🟢 Jízda aktivní';
    isRunning = true;
  }
});

document.getElementById('stop-btn').addEventListener('click', () => {
  stopTimer();
  rideStatusEl.textContent = '🔴 Jízda zastavena';
  isRunning = false;
});

// Funkce pro sledování geolokace
if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    let speed = position.coords.speed ? position.coords.speed * 3.6 : 0; // Rychlost v km/h
    speedDisplayEl.textContent = `${speed.toFixed(1)} km/h`;

    if (speed > maxSpeed) {
      maxSpeed = speed; // Aktualizace max. rychlosti
      document.getElementById('max-speed').textContent = `${maxSpeed.toFixed(1)} km/h`;
    }

    updateDistance(position);
  });
} else {
  alert('GPS není k dispozici.');
}
