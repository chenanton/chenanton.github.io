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
		// 		<li><a href="about">About</a></li>
		// 		<li><a href="education">Education</a></li>
		// 		<li><a href="experience">Experience</a></li>
		// 		<li><a href="projects">Projects</a></li>
		// 		<li><a href="research">Research</a></li>
		// 		<li><a href="courses">Courses</a></li>
		// 		<li><a href="linux-unix">Linux/Unix</a></li>
		// 		<li><a href="keyboards">Keyboards</a></li>
		// 		<li><a href="piano">Piano</a></li>
		// 		<li><a href="trumpet">Trumpet</a></li>
		// 		<li><a href="running">Running</a></li>
		// 		<li><a href="cooking">Cooking</a></li>
		// 		<li><a href="assets/AntonChenResume.pdf">Resume</a></li>
		// 		<li><a href="contact">Contact</a></li>
		// 		<li><a href="settings">Settings</a></li>
		// 	</ul>
		// `;
		this.innerHTML = `
			<span class="title">Anton Chen</span>
			<ul>
				<li><a href="about">About</a></li>
				<li><a href="education">Education</a></li>
				<li><a href="experience">Experience</a></li>
				<li><a href="projects">Projects</a></li>
				<li><a href="assets/AntonChenResume.pdf">Resume</a></li>
				<li><a href="contact">Contact</a></li>
				<li><a href="settings">Settings</a></li>
			</ul>
		`;
	}

}

customElements.define('nav-menu', Menu);

setThemeColors();
