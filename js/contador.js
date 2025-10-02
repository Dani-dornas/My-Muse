// Contador de tempo
function updateCounter() {
  // Data do início do namoro
  const startDate = new Date("2025-06-03T20:36:00");
  const now = new Date();

  // Cálculo de meses completos
  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  // Se ainda não passou o dia do mês, desconta um mês
  if (now.getDate() < startDate.getDate()) {
    months--;
  }

  // Data base depois de contar os meses
  let adjustedStart = new Date(startDate);
  adjustedStart.setMonth(startDate.getMonth() + months);

  // Diferença restante em milissegundos
  let diff = now - adjustedStart;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Atualizar no HTML
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Atualiza imediatamente e a cada segundo
updateCounter();
setInterval(updateCounter, 1000);
