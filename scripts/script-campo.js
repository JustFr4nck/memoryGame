const immagini = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 
    'img4.jpg', 'img5.jpg', 'img6.jpg'
  ];
  const retro = 'back.jpg';
  
  function creaCarte() {
    const game = document.querySelector('.memory-game');
    const tutteLeCarte = [...immagini, ...immagini]; 
    
    tutteLeCarte.sort(() => Math.random() - 0.5);
    
    tutteLeCarte.forEach((img, i) => {
      const carta = document.createElement('div');
      carta.className = 'memory-card';
      carta.dataset.img = img;
      
      carta.innerHTML = `
        <img src="${img}" class="front-face">
        <img src="${retro}" class="back-face">
      `;
      
      carta.addEventListener('click', giraCarta);
      game.appendChild(carta);
    });
  }
  
  let primaCarta, secondaCarta;
  let bloccato = false;
  

  function giraCarta() {
    if (bloccato) return;
    if (this === primaCarta) return;
    
    this.classList.add('flip');
    
    if (!primaCarta) {
      primaCarta = this;
      return;
    }
    
    secondaCarta = this;
    bloccato = true;
    
    controllaCoppia();
  }
  
  function controllaCoppia() {
    const match = primaCarta.dataset.img === secondaCarta.dataset.img;
    
    if (match) {
      primaCarta.removeEventListener('click', giraCarta);
      secondaCarta.removeEventListener('click', giraCarta);
      resetta();
    } else {
      setTimeout(() => {
        primaCarta.classList.remove('flip');
        secondaCarta.classList.remove('flip');
        resetta();
      }, 1000);
    }
  }


  function resetta() {
    [primaCarta, secondaCarta] = [null, null];
    bloccato = false;
  }
  
  window.onload = creaCarte;