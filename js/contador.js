// Contador de tempo — versão corrigida e robusta
function updateCounter() {
  const startDate = new Date("2025-06-03T00:00:00"); // início do namoro (local time)
  const now = new Date();

  // Se ainda não chegou a data de início, mostra zeros (proteção)
  if (now < startDate) {
    document.getElementById("months").textContent = 0;
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;
    return;
  }

  // Constantes de milissegundos
  const MS = {
    sec: 1000,
    min: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24
  };

  // Calcula meses completos (ano/mes)
  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    (now.getMonth() - startDate.getMonth());

  // Ajusta uma data base somando 'months' ao startDate
  let adjustedStart = new Date(startDate);
  adjustedStart.setMonth(startDate.getMonth() + months);

  // Se a data ajustada estiver NO FUTURO (ex.: mesmo dia mas horário ainda não chegou),
  // descontamos 1 mês e recalculamos adjustedStart
  if (adjustedStart > now) {
    months--;
    adjustedStart = new Date(startDate);
    adjustedStart.setMonth(startDate.getMonth() + months);
  }

  // Diferença restante em ms a partir da data ajustada
  let diff = now - adjustedStart;

  // Converte para dias / horas / minutos / segundos (restantes)
  const days = Math.floor(diff / MS.day);
  diff -= days * MS.day;

  const hours = Math.floor(diff / MS.hour);
  diff -= hours * MS.hour;

  const minutes = Math.floor(diff / MS.min);
  diff -= minutes * MS.min;

  const seconds = Math.floor(diff / MS.sec);

  // Atualiza no HTML (assumindo que os elementos existem)
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// inicia e atualiza a cada segundo
updateCounter();
setInterval(updateCounter, 1000);
