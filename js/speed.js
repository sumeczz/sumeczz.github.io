let maxSpeed = 0;
const speedEl = document.getElementById("speed-display"); // Element pro rychlost
const maxSpeedEl = document.getElementById("max-speed"); // Element pro maximální rychlost

export function initSpeedWatcher() {
  // Kontrola, zda je geolokační API k dispozici
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      (pos) => {
        const speed = pos.coords.speed; // Získání aktuální rychlosti
        if (speed != null) {
          const speedKmh = speed * 3.6; // Převod na km/h
          speedEl.innerHTML = `${speedKmh.toFixed(1)} <span class="text-2xl">km/h</span>`; // Aktualizace zobrazení rychlosti

          // Aktualizace maximální rychlosti
          if (speedKmh > maxSpeed) {
            maxSpeed = speedKmh;
            maxSpeedEl.textContent = `${maxSpeed.toFixed(1)} km/h`;
          }
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          console.error("Chyba GPS: Uživatel zamítl přístup k poloze.");
          alert("Chyba GPS: Uživatel zamítl přístup k poloze.");
        } else {
          console.error("Chyba GPS: " + err.message);
          alert("Chyba GPS: " + err.message);
        }
      },
      { enableHighAccuracy: true }
    );
  } else {
    console.error("Geolocation není podporováno tímto prohlížečem.");
    alert("Geolocation není podporováno tímto prohlížečem.");
  }
}
