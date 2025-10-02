const heartsContainer = document.getElementById("heartsContainer");

      // Função para criar um coração
      function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "%";
        heart.style.top = "100%";

        const duration = Math.random() * 3 + 5;
        heart.style.animationDuration = duration + "s";

        heartsContainer.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, duration * 1000);
      }

      // Função para criar uma pétala
      function createPetal() {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = Math.random() * 100 + "%";
        petal.style.top = "100%";

        const size = Math.random() * 8 + 8;
        petal.style.width = size + "px";
        petal.style.height = size + "px";

        const duration = Math.random() * 4 + 8;
        petal.style.animationDuration = duration + "s";

        const pinkShades = [
          "radial-gradient(ellipse at center, #ff69b4 0%, #ff1493 50%, #c71585 100%)",
          "radial-gradient(ellipse at center, #ffb6c1 0%, #ff69b4 50%, #ff1493 100%)",
          "radial-gradient(ellipse at center, #ffc0cb 0%, #ffb6c1 50%, #ff69b4 100%)",
        ];
        petal.style.background =
          pinkShades[Math.floor(Math.random() * pinkShades.length)];

        heartsContainer.appendChild(petal);

        setTimeout(() => {
          petal.remove();
        }, duration * 1000);
      }

      // Criar corações periodicamente
      setInterval(createHeart, 1000);

      // Criar pétalas periodicamente
      setInterval(createPetal, 600);

      // Criar alguns iniciais
      for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 200);
        setTimeout(createPetal, i * 150);
      }