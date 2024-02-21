var modes = ['default', 'network', 'terminal']
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

function toggleContent(page, id) {
  var listItem = event.target.parentNode;
  var contentDiv = document.getElementById(id + '-content');

  if (!contentDiv) {
    contentDiv = document.createElement('div');
    contentDiv.id = id + '-content';
    contentDiv.className = 'content-container';
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
