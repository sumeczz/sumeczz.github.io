let previousPosition = null;
let totalDistance = 0;

const distanceEl = document.getElementById("ride-distance");

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function updateDistance(position) {
  if (previousPosition) {
    const distance = calculateDistance(
      previousPosition.coords.latitude,
      previousPosition.coords.longitude,
      position.coords.latitude,
      position.coords.longitude
    );
    totalDistance += distance;
    distanceEl.textContent = `${totalDistance.toFixed(2)} km`;
    previousPosition = position;
    return distance;
  } else {
    previousPosition = position;
    return 0;
  }
}

export function getTotalDistance() {
  return totalDistance;
}
