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

document.getElementById('toggle-theme').checked = false;

var isDarkmode = false;
let vantaBackground = null;
let typed = null;

// Toggle theme
const checkbox = document.getElementById('toggle-theme');
checkbox.addEventListener('change', () => {
  document.body.classList.remove(isDarkmode ? "network" : "default");
  isDarkmode = !isDarkmode;
  document.body.classList.add(isDarkmode ? "network" : "default");

  // Customize other mode-specific actions here
  document.title = isDarkmode ? "Anton Chen" : "antonchen.ca";
  document.getElementById('greeting').textContent 
    = isDarkmode ? "Hi! 👋" : "Anton Chen";
  document.getElementById('copyright').textContent 
    = isDarkmode ? "© 2024 | Designed && programmed by yours truly 🧑‍💻" : '© 2001 Anton Chen';

  var audio = document.getElementById('radio');
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
      color: 0xB71737,
      backgroundColor: 0x10141A,
    });

    typed = new Typed('#typewriter', {
      strings: ['I\'m Anton!^100 Nice two', 'I\'m Anton! Nice to meet you!'],
      typeSpeed: 35,
      startDelay: 500,
      backDelay: 70,
      smartBackspace: true,
    });

    audio.src = 'assets/music/let-girls-play-soccer.mp3';
  } else {
    vantaBackground.destroy();
    typed.destroy();

    audio.src = 'assets/music/memory-limitations-in-artificial-intelligence.mp3';
  }

  turnOffMusic();
});

document.querySelectorAll(".caret").forEach(toggler => {
  toggler.addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
  });
});

document.getElementById('radioLink').addEventListener('click', () => {
  var audio = document.getElementById('radio');
  if (audio.paused) {
    turnOnMusic();
  } else {
    turnOffMusic();
  }
});

function turnOffMusic() {
  var audio = document.getElementById('radio');
  audio.pause();

  var radioLink = document.getElementById('radioLink');
  radioLink.textContent = 'Radio';
}

function turnOnMusic() {
  var audio = document.getElementById('radio');
  audio.play();

  var radioLink = document.getElementById('radioLink');
  radioLink.textContent = 'Radio (on)';
}
