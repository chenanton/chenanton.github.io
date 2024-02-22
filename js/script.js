var modes = [
  'default', 
  'network', 
  // 'terminal'
]

var titles = [
  'antonchen.ca',
  'Anton Chen\'s Website',
  'root@antonchen.ca'
]

var greetings1 = [
  '',
  'Hi! 👋'
]

var greetings2 = [
  'Anton Chen',
  'I\'m Anton. Nice to meet you!',
  `$ echo \'#include <iostream>

int main() {
  std::cout << "antonchen.ca" << std::endl;

  return 0;
}
\'
> main.cc
&& g++ main.cc
&& ./a.out`
]

var copyright = [
  '© 2001 Anton Chen',
  '© 2024 | Designed & programmed by yours truly 🤯'
]

document.getElementById('toggle-theme').checked = false;

var currentModeIndex = 0;

let vantaBackground = null;

function toggleMode() {
  // Remove the current mode class
  document.body.classList.remove(modes[currentModeIndex]);

  // Increment the mode index or reset to 0 if at the end of the array
  currentModeIndex = (currentModeIndex + 1) % modes.length;

  // Add the new mode class
  document.body.classList.add(modes[currentModeIndex]);

  // Customize other mode-specific actions here
  document.title = titles[currentModeIndex];
  document.getElementById('greeting1').textContent = greetings1[currentModeIndex];
  document.getElementById('greeting2').textContent = greetings2[currentModeIndex];
  document.getElementById('copyright').textContent = copyright[currentModeIndex];

  if (modes[currentModeIndex] === 'network') {
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
  } else if (vantaBackground) {
    vantaBackground.destroy();
  }
}

function toggleContent(page, id, nestLevel = 0) {
  var listItem = event.target.parentNode;
  var contentDiv = document.getElementById(id + '-content');

  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.id = id + '-content';
    contentDiv.className = `content-container nest-level-${nestLevel}` ;

    listItem.appendChild(contentDiv);

    fetch(page)
      .then(response => response.text())
      .then(html => {
        contentDiv.innerHTML = html;
      })
      .catch(error => console.error('Error fetching content:', error));
  } else {
    if (contentDiv.innerHTML.trim() !== '') {
      contentDiv.innerHTML = ''; // Clear the content
    }

    // Remove the contentDiv from its parent
    listItem.removeChild(contentDiv);
  }
}

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
} 
