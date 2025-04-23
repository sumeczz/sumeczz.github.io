let paused = false;

export function initControls({ startTracking, stopTracking }) {
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const statusEl = document.getElementById("ride-status");

  pauseBtn.addEventListener("click", () => {
    paused = !paused;
    if (paused) {
      stopTracking();
      statusEl.textContent = "⏸ Pauza";
      pauseBtn.textContent = "▶️ Pokračovat";
    } else {
      startTracking();
      statusEl.textContent = "🟢 Jízda aktivní";
      pauseBtn.textContent = "⏸ Pauza";
    }
  });

  stopBtn.addEventListener("click", () => {
    stopTracking();
    statusEl.textContent = "⛔ Zastaveno";
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
  });
}
