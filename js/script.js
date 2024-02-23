const defaultMode = {
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

const darkMode = {
  name: "network",
  title: "Anton Chen",
  greeting: "Hi! 👋",
  copyright: "© 2024 | Designed && programmed by yours truly 🧑‍💻",
  songs: [
    "Sleepy Fish - let girls play soccer",
    "Birocratic - Belly Breathing",
    "Team Astro - Love Lockdown"
  ]
};

function shuffleArray(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

defaultMode.songs = shuffleArray(defaultMode.songs);
darkMode.songs = shuffleArray(darkMode.songs);

var isDarkmode = false;

let vantaBackground = null;
let typed = null;

let playlist = (isDarkmode ? darkMode : defaultMode).songs;

// Toggle theme
var audio = document.getElementById('radio');

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
      color: 0x1f242f,
      backgroundColor: 0x11151F,
      points: 12.00,
      maxDistance: 24.00,
      spacing: 16.00
    });

    typed = new Typed('#typewriter', {
      strings: [
        'I\'m anto',
        'I\'m Anton!^200 Nice too',
        'I\'m Anton! Nice to meet you! :)^5000',
        'I\'m Anton! Nice to meet you! :P^1000',
        'I\'m Anton! Nice to meet you! :)',
      ],
      typeSpeed: 30,
      startDelay: 500,
      backDelay: 100,
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
