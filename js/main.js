import { startTimer, stopTimer, updateTime } from './speed.js';
import { updateDistance, getTotalDistance } from './distance.js';

let isRunning = false;
let rideStatusEl = document.getElementById('ride-status');
let speedDisplayEl = document.getElementById('speed-display');
let maxSpeed = 0;
let lastPosition = null;
let lastTime = null;

// Start / pauza
document.getElementById('pause-btn').addEventListener('click', () => {
  isRunning ? stop() : start();
});

document.getElementById('stop-btn').addEventListener('click', () => {
  stop();
  rideStatusEl.textContent = '🔴 Jízda zastavena';
});

function start() {
  startTimer();
  rideStatusEl.textContent = '🟢 Jízda aktivní';
  isRunning = true;
}

function stop() {
  stopTimer();
  isRunning = false;
}

// Geolokace
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(onLocationUpdate, onError, {
    enableHighAccuracy: true,
    maximumAge: 1000,
    timeout: 5000
  });
} else {
  alert('Tvoje zařízení nepodporuje GPS.');
}

function onLocationUpdate(position) {
  const currentTime = Date.now();

  if (isRunning) {
    if (lastPosition && lastTime) {
      const distance = updateDistance(position); // Vrací vzdálenost od předchozí pozice
      const timeElapsed = (currentTime - lastTime) / 1000; // v sekundách
      const speed = (distance / timeElapsed) * 3600; // km/h

      if (!isNaN(speed)) {
        speedDisplayEl.textContent = `${speed.toFixed(1)} km/h`;

        if (speed > maxSpeed) {
          maxSpeed = speed;
          document.getElementById('max-speed').textContent = `${maxSpeed.toFixed(1)} km/h`;
        }

        const avgSpeed = getTotalDistance() / (timeElapsed / 3600);
        document.getElementById('avg-speed').textContent = `${avgSpeed.toFixed(1)} km/h`;
      }
    }

    lastTime = currentTime;
    lastPosition = position;
  }
}

function onError(error) {
  alert("Chyba GPS: " + error.message);
}
