let isDarkMode = false;
let vantaBackground = null;

function toggleDarkMode() {
  isDarkMode = !isDarkMode; 

  document.body.classList.toggle('dark-mode'); // toggle styling

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
