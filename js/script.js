let isDarkMode = false;
let vantaBackground = null;

function toggleDarkMode() {
  isDarkMode = !isDarkMode; 

  document.body.classList.toggle('dark-mode');

  if (isDarkMode) {
    vantaBackground = VANTA.NET({
      el: "#vanta-container",
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x1A1E2A,
      backgroundColor: 0x11151F,
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
    listItem.appendChild(contentDiv);

    fetch(page)
      .then(response => response.text())
      .then(html => {
        contentDiv.innerHTML = html;
      })
      .catch(error => console.error('Error fetching content:', error));
  } else {
    if (contentDiv.innerHTML.trim() !== '') {
      contentDiv.innerHTML = '';
    } 

    listItem.removeChild(contentDiv);
  }
}
