  
  document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('video-bg');
   
    
  
    function attemptPlay() {
        video.play().then(() => {
            console.log('Video autoplay started');
        }).catch(error => {
            console.log('Autoplay prevented:', error);
            const playButton = document.createElement('button');
            playButton.innerHTML = '▶️ Play Background';
            playButton.style.position = 'fixed';
            playButton.style.bottom = '20px';
            playButton.style.left = '50%';
            playButton.style.transform = 'translateX(-50%)';
            playButton.style.zIndex = '1000';
            playButton.style.padding = '10px 20px';
            playButton.style.background = '#FF6D00';
            playButton.style.color = 'black';
            playButton.style.border = 'none';
            playButton.style.borderRadius = '5px';
            playButton.style.cursor = 'pointer';
            
            playButton.addEventListener('click', () => {
                video.play();
                music.play();
                playButton.remove();
            });
            
            document.body.appendChild(playButton);
        });
    }
    
   
    if (video.readyState >= 3) {
        attemptPlay();
    } else {
        video.addEventListener('loadedmetadata', attemptPlay);
    }
    

    if (/Mobi|Android/i.test(navigatorUserAgent)) {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
    }
});

const music = document.getElementById('backgroundMusic');
const toggleBtn = document.getElementById('musicToggle');

// Controllo dello stato della musica
let isPlaying = false;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    toggleBtn.textContent = "▶️ Attiva musica";
  } else {
    music.play();
    toggleBtn.textContent = "⏸️ Disattiva musica";
  }
  isPlaying = !isPlaying;
});



