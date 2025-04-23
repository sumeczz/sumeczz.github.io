import { initSpeedWatcher } from './speed.js';
import { initTimer, resetTimer, getElapsedTime } from './timer.js';
import { initDistanceTracker, resetDistance, getDistance } from './distance.js';
import { initControls } from './controls.js';


let watchId;

function startTracking() {
  watchId = initSpeedWatcher();
  initTimer();
  initDistanceTracker();
}

function stopTracking() {
  if (watchId) navigator.geolocation.clearWatch(watchId);
  resetTimer();
  resetDistance();
}

initControls({ startTracking, stopTracking });
startTracking();
