let lastPos = null;
let totalDistance = 0;
const distEl = document.getElementById("ride-distance");
const avgSpeedEl = document.getElementById("avg-speed");

export function initDistanceTracker() {
  navigator.geolocation.watchPosition((pos) => {
    const { latitude, longitude, speed } = pos.coords;

    if (lastPos) {
      const dist = calcDistance(lastPos.lat, lastPos.lon, latitude, longitude);
      totalDistance += dist;
      distEl.textContent = `${totalDistance.toFixed(2)} km`;

      const timeH = getTimeInHours();
      if (timeH > 0) {
        const avgSpeed = totalDistance / timeH;
        avgSpeedEl.textContent = `${avgSpeed.toFixed(1)} km/h`;
      }
    }

    lastPos = { lat: latitude, lon: longitude };
  }, null, { enableHighAccuracy: true });
}

function calcDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function getTimeInHours() {
  const t = document.getElementById("ride-time").textContent.split(":");
  const h = parseInt(t[0]), m = parseInt(t[1]), s = parseInt(t[2]);
  return h + m / 60 + s / 3600;
}

export function resetDistance() {
  totalDistance = 0;
  lastPos = null;
  distEl.textContent = "0.0 km";
  avgSpeedEl.textContent = "0.0 km/h";
}

// PŘIDÁNO: Export funkce getDistance
export function getDistance() {
  return totalDistance;
}
