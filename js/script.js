let isDarkMode = false;
let vantaNet = null;

function toggleDarkMode() {
  const body = document.body;

  body.classList.toggle('dark-mode', isDarkMode);

  isDarkMode = !isDarkMode; 

  // Toggle styling
  body.style.color = isDarkMode ? '#f3f4f5' : '';
  body.style.fontFamily = isDarkMode ? 'Inter, Helvetica, sans-serif' : '';

  if (isDarkMode) {
    vantaNet = VANTA.NET({
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
  } else if (vantaNet) {
    vantaNet.destroy();
  }
}

function toggleContent(page, id) {
  var listItem = event.target.parentNode;
  var contentDiv = document.getElementById(id + '-content');

  if (!contentDiv) {
    // Create a new content div if not exists
    contentDiv = document.createElement('div');
    contentDiv.id = id + '-content';
    contentDiv.className = 'content-container';
    listItem.appendChild(contentDiv);

    // Fetch and show content
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
