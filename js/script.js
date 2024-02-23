var defaultMode = {
  name: "default",
  title: "antonchen.ca",
  greeting: "Anton Chen",
  copyright: "© 2001 Anton Chen",
  songs: [
    "No Love In The House Of Gold - heavy machinery (oil rig)",
    "Infinity Frequencies - Memory limitations in artificial intelligence",
    "Other Nothing - Ww",
    "Izzard - Dec 9",
    'Willix, hiraeth - Silence, I\'m Sinking.',
    'Hisohkah, WMD - School Rooftop - Slowed Down Version',
    'Sangam - One',
    'Wishing - Goodnight Dad I Love You',
  ]
};

var darkMode = {
  name: "network",
  title: "Anton Chen",
  greeting: "Hi! 👋",
  copyright: "© 2024 | Designed && programmed by yours truly 🧑‍💻",
  songs: [
    "Sleepy Fish - let girls play soccer",
    "Birocratic - Belly Breathing",
    "Team Astro - Love Lockdown"
  ],
  accentColors: [
    0x1f242f,
    0xb71737, // Red
    0x48b339, // Green
    0x318fcf, // Blue
    0xc678dd, // Purple
    0xb5906b, // Yellow
  ]
};

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

defaultMode.songs = shuffleArray(defaultMode.songs);
darkMode.songs = shuffleArray(darkMode.songs);

var isDarkmode = false;

let vantaBackground = null;
let netColorIndex = 0; // Vanta net color
let typed = null;

let playlist = (isDarkmode ? darkMode : defaultMode).songs;

// Updates accent colors in darkmode
function updateAccents() {
  if (isDarkmode && vantaBackground !== null) {
    netColorIndex = (netColorIndex + 1) % darkMode.accentColors.length;
    vantaBackground.setOptions({color: darkMode.accentColors[netColorIndex]});
  }
}

// Toggle theme
var audio = document.getElementById('radio');

// Event handlers
document.querySelectorAll('.toggle').forEach(link => {
  link.addEventListener('click', () => {
    link.classList.toggle('toggled');
  });
});

document.querySelectorAll('.toggle-content').forEach(link => {
  link.addEventListener('click', () => {
    var id = link.id;
    var nestLevel = Array.from(link.closest('ul').classList)
      .find(c => c.startsWith('nest-level-'));

    const listItem = link.parentNode;
    const page = `content/${id}.html`
    const contentDiv = document.getElementById(`${id}-content`);

    if (!contentDiv) {
      const newContentDiv = document.createElement('div');
      newContentDiv.id = `${id}-content`;
      newContentDiv.className = `content-container ${nestLevel}` ;

      listItem.appendChild(newContentDiv);

      fetch(page)
        .then(response => response.text())
        .then(html => {
          newContentDiv.innerHTML = html;
        })
        .catch(error => console.error('Error fetching content:', error));
    } else {
      // Clear or remove contentDiv based on its content
      if (contentDiv.innerHTML.trim() !== '') {
        contentDiv.innerHTML = ''; // Clear the content
      }

      listItem.removeChild(contentDiv);
    }
  });
});

document.querySelectorAll(".toggle-dropdown").forEach(toggler => {
  toggler.addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
  });
});

const heading = document.querySelector('h1');
heading.addEventListener('click', function() {
  updateAccents();
});

document.getElementById('toggle-theme').checked = false;

const checkbox = document.getElementById('toggle-theme');
checkbox.addEventListener('change', () => {
  document.body.classList.remove((isDarkmode ? darkMode : defaultMode).name);

  isDarkmode = !isDarkmode;

  let mode = isDarkmode ? darkMode : defaultMode;
  document.body.classList.add(mode.name);
  document.title = mode.title
  document.getElementById('greeting').textContent = mode.greeting
  document.getElementById('copyright').textContent = mode.copyright

  playlist = (isDarkmode ? darkMode : defaultMode).songs;

  var paused = audio.paused;

  if (checkbox.checked) {
    vantaBackground = VANTA.NET({
      el: "#vanta-container",
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: darkMode.accentColors[netColorIndex],
      backgroundColor: 0x11151F,
      points: 12.00,
      maxDistance: 24.00,
      spacing: 16.00
    });

    typed = new Typed('#typewriter', {
      strings: [
        'I\'m anto',
        'I\'m Anton!^200 Nice too',
        'I\'m Anton! Nice to met',
        'I\'m Anton! Nice to meet you! :)'
      ],
      typeSpeed: 30,
      startDelay: 500,
      backDelay: 70,
      smartBackspace: true,
    });

  } else {
    vantaBackground.destroy();
    typed.destroy();
  }

  stopMusic();
  if (!paused) {
    playMusic();
  } 
});

// Music
let currentSongIndex = 0;

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
