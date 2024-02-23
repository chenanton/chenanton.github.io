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

let vantaBackground = null;
let typed = null;

function setStyle() {
  let mode = isDarkMode ? darkMode : defaultMode;
  document.title = mode.title
  document.getElementById('greeting').textContent = mode.greeting
  document.getElementById('copyright').textContent = mode.copyright

  if (isDarkMode) {
    document.body.classList.add("network");
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
        'I\'m ant',
        'I\'m Anton!^300 Nice to meet you! :)^5000',
        'I\'m Anton! Nice to meet you! :P^1000',
        'I\'m Anton! Nice to meet you! :)',
      ],
      typeSpeed: 30,
      startDelay: 500,
      backDelay: 100,
      smartBackspace: true,
    });

  } else {
    document.body.classList.remove("network");
    vantaBackground.destroy();
    typed.destroy();
  }
}

var isDarkMode = (localStorage.getItem("darkModeEnabled") === "true") ? true : false;
if (isDarkMode) {
  setStyle();
  document.body.classList.add("network");
  document.getElementById('toggle-theme').checked = true;
} else {
  document.body.classList.remove("network");
  document.getElementById('toggle-theme').checked = false;
}

let playlist = (isDarkMode ? darkMode : defaultMode).songs;
var audio = document.getElementById('radio');

const checkbox = document.getElementById('toggle-theme');
checkbox.addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem("darkModeEnabled", isDarkMode.toString());

  var paused = audio.paused;

  setStyle();

  stopMusic();

  playlist = (isDarkMode ? darkMode : defaultMode).songs;

  if (!paused) {
    playMusic();
  } 
});
