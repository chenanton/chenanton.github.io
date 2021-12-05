/* Sets the document colors */
function setDocumentColors(background, foreground, alink, link, vlink) {
	document.body.style.background = background;
	document.body.style.color = foreground;
	document.alinkColor = alink;
	document.linkColor = link;
	document.vlinkColor = vlink;
}

function setThemeColors() {
	console.log("we in")
	let isDarkMode = localStorage.getItem("isDarkMode");
	if (typeof isDarkMode === "undefined") {
		localStorage.setItem("isDarkMode", false);
	}
	if (isDarkMode === "true") {
		setDocumentColors("black", "white", "pink", "lightblue", "pink");
	} else {
		setDocumentColors("white", "black", "blue", "blue", "purple");
	}
}

class Menu extends HTMLElement {
  constructor() {
    super();
  }

	connectedCallback() {
		// this.innerHTML = `
		// 	<span class="title">Anton Chen</span>
		// 	<ul>
		// 		<li><a href="about.html">About</a></li>
		// 		<li><a href="education.html">Education</a></li>
		// 		<li><a href="experience.html">Experience</a></li>
		// 		<li><a href="projects.html">Projects</a></li>
		// 		<li><a href="research.html">Research</a></li>
		// 		<li><a href="courses.html">Courses</a></li>
		// 		<li><a href="linux-unix.html">Linux/Unix</a></li>
		// 		<li><a href="keyboards.html">Keyboards</a></li>
		// 		<li><a href="piano.html">Piano</a></li>
		// 		<li><a href="trumpet.html">Trumpet</a></li>
		// 		<li><a href="running.html">Running</a></li>
		// 		<li><a href="cooking.html">Cooking</a></li>
		// 		<li><a href="assets/AntonChenResume.pdf">Resume</a></li>
		// 		<li><a href="contact.html">Contact</a></li>
		// 		<li><a href="settings.html">Settings</a></li>
		// 	</ul>
		// `;
		this.innerHTML = `
			<span class="title">Anton Chen</span>
			<ul>
				<li><a href="about.html">About</a></li>
				<li><a href="education.html">Education</a></li>
				<li><a href="experience.html">Experience</a></li>
				<li><a href="projects.html">Projects</a></li>
				<li><a href="assets/AntonChenResume.pdf">Resume</a></li>
				<li><a href="contact.html">Contact</a></li>
				<li><a href="settings.html">Settings</a></li>
			</ul>
		`;
	}

}

customElements.define('nav-menu', Menu);

setThemeColors();
