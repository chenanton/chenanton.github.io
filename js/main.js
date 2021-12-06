class Menu extends HTMLElement {
  constructor() {
    super();
  }

	connectedCallback() {
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

const THEMES = {
	"default": {
		"--bg-color": "white",
		"--fg-color": "black",
		"--href-color": "blue",
		"--font-family": "Helvetica"
	},
	"dark": {
		"--bg-color": "black",
		"--fg-color": "white",
		"--href-color": "lightblue",
		"--font-family": "Helvetica"
	},
	"nord": {
		"--bg-color": "#2e3440",
		"--fg-color": "#d8dee9",
		"--href-color": "#88c0d0",
		"--font-family": "Iosevka"
	}
}


function setColors() {
	const setCSSVars = (vars) => {
		let r = document.querySelector(":root");
		Object.keys(vars).forEach((key) => r.style.setProperty(key, vars[key]));
	};

	let isDarkMode = localStorage.getItem("isDarkMode");
	if (isDarkMode === "true") {
		setCSSVars(THEMES.dark);
	} else {
		setCSSVars(THEMES.default);
	}
}

customElements.define('nav-menu', Menu);
setColors();
