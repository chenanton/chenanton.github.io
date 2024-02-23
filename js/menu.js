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

