var audio = document.getElementById('radio');
let currentSongIndex = 0;

// Music
document.getElementById('toggle-radio').addEventListener('click', () => {
  if (audio.paused) {
    playMusic();
  } else {
    stopMusic();
  }
});

function playMusic() {
  songName = playlist[currentSongIndex]
  audio.src = `assets/music/${songName}.mp3`;
  audio.play();

  document.getElementById('song-name').textContent = songName;
}

function stopMusic() {
  audio.pause();
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
}

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playMusic();
});

