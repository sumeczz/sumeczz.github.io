let previousPosition = null; // Předchozí pozice pro výpočet vzdálenosti
let totalDistance = 0; // Celková ujetá vzdálenost v kilometrech

const distanceEl = document.getElementById("ride-distance"); // Element pro zobrazení vzdálenosti

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Poloměr Země v km
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Vzdálenost v km
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
    totalDistance += distance; // Přičítání nové vzdálenosti
    distanceEl.textContent = `${totalDistance.toFixed(1)} km`; // Aktualizace vzdálenosti na stránce
  }
  previousPosition = position; // Uložení nové pozice
}
