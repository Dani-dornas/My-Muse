document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("background-music");
  const titleElement = document.getElementById("current-title");
  const artistElement = document.getElementById("artist");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const volumeControl = document.getElementById("volume-control");

  // checagem rápida para evitar erros se algum elemento estiver faltando
  if (
    !music ||
    !titleElement ||
    !artistElement ||
    !progressBar ||
    !currentTimeEl ||
    !durationEl ||
    !volumeControl
  ) {
    console.error("Player: algum elemento do DOM não foi encontrado.");
    return;
  }

  const playlist = [
    {
      artist: "BTS",
      title: "Butterfly",
      src: "./assets/audio/Butterfly BTS.mp3",
    },
    {
      artist: "BTS",
      title: "Best Of Me",
      src: "./assets/audio/Best Of Me BTS.mp3",
    },
    {
      artist: "Dreamcatcher",
      title: "Chase Me",
      src: "./assets/audio/Dreamcatcher - Chase Me.mp3",
    },
    { artist: "BTS", title: "euphoria", src: "./assets/audio/euphoria.mp3" },
    {
      artist: "BTS",
      title: "Mikrokosmos",
      src: "./assets/audio/Mikrokosmos BTS.mp3",
    },
    {
      artist: "Stray Kids",
      title: "Mixtape OH",
      src: "./assets/audio/Stray Kids - Mixtape  OH.mp3",
    },
    {
      artist: "Stray Kids",
      title: "Lose My Breath",
      src: "./assets/audio/Stray Kids 'Lose My Breath.mp3",
    },
  ];

  // Pre-encode os src para evitar problemas com espaços e caracteres especiais
  playlist.forEach((item) => {
    item.encodedSrc = encodeURI(item.src);
  });

  let currentIndex = 0;

  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  }

  function loadMusic(index) {
    const item = playlist[index];
    artistElement.textContent = playlist[index].artist;
    titleElement.textContent = item.title || "—";
    // usa o src codificado
    music.src = item.encodedSrc;
    music.load();
    // tentar tocar, mas tratar rejeição (autoplay bloqueado)
    music.play().catch((err) => {
      // não é fatal — apenas informe no console
      console.warn(
        "Não foi possível dar play automaticamente (autoplay pode estar bloqueado):",
        err
      );
    });
  }

  // Quando metadados estiverem prontos, atualiza a duração
  music.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(music.duration);
  });

  // Atualiza barra/tempo enquanto a música toca
  music.addEventListener("timeupdate", () => {
    if (isFinite(music.duration) && music.duration > 0) {
      const progress = (music.currentTime / music.duration) * 100;
      progressBar.value = progress;
    } else {
      progressBar.value = 0;
    }
    currentTimeEl.textContent = formatTime(music.currentTime);
    // duration também pode atualizar aqui caso já tenha sido carregado
    durationEl.textContent = formatTime(music.duration);
  });

  // permite arrastar/seek
  progressBar.addEventListener("input", () => {
    if (isFinite(music.duration) && music.duration > 0) {
      music.currentTime = (progressBar.value / 100) * music.duration;
    }
  });

  music.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadMusic(currentIndex);
  });

  function toggleMusic() {
    if (music.paused) {
      music.play().catch((err) => console.warn("play blocked:", err));
    } else {
      music.pause();
    }
  }

  const playPauseBtn = document.getElementById("play-pause-btn");

  playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playPauseBtn.textContent = "⏸️"; // muda o ícone para pause
    } else {
      music.pause();
      playPauseBtn.textContent = "▶️"; // muda o ícone para play
    }
  });

  // Atualiza ícone automaticamente se música terminar
  music.addEventListener("ended", () => {
    playPauseBtn.textContent = "▶️";
  });

  function nextMusic() {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadMusic(currentIndex);
  }

  function prevMusic() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadMusic(currentIndex);
  }

  // Ganchos globais (exponha para o HTML inline se preferir)
  window.toggleMusic = toggleMusic;
  window.nextMusic = nextMusic;
  window.prevMusic = prevMusic;

  // Volume inicial bem baixo
  music.volume = 0;

  // Fade-in até o valor do slider
  music.addEventListener("play", () => {
    let targetVolume = parseFloat(volumeControl.value || 0.1);
    let step = 0.01; // tamanho do aumento por vez
    let fade = setInterval(() => {
      // Se o usuário mudar o slider enquanto o fade acontece,
      // o targetVolume vai acompanhar
      targetVolume = parseFloat(volumeControl.value || 0.1);

      if (music.volume < targetVolume) {
        music.volume = Math.min(music.volume + step, targetVolume);
      } else {
        clearInterval(fade);
      }
    }, 600);
  });

  // Controle de volume pelo slider
  volumeControl.addEventListener("input", () => {
    music.volume = parseFloat(volumeControl.value);
  });

function updateProgressBarColor() {
  const value = progressBar.value;
  progressBar.style.background = `linear-gradient(to right, #ffffffff 0%, #ffffffff ${value}%, #ddd ${value}%, #ddd 100%)`;
}

// Chame sempre que atualizar a barra
music.addEventListener("timeupdate", () => {
  if (isFinite(music.duration) && music.duration > 0) {
    const progress = (music.currentTime / music.duration) * 100;
    progressBar.value = progress;
    updateProgressBarColor();
  } else {
    progressBar.value = 0;
    updateProgressBarColor();
  }
});

// Também ao arrastar manualmente
progressBar.addEventListener("input", () => {
  updateProgressBarColor();
});


  // inicia o player
  loadMusic(currentIndex);
});
