function toggleDarkMode() {
	let isDarkMode = localStorage.getItem("isDarkMode");
	if (isDarkMode !== "true") {
		localStorage.setItem("isDarkMode", "true");
	} else {
		localStorage.setItem("isDarkMode", "false");
	}
}

document.getElementById("toggle-dark-mode").addEventListener("click", () => {
	toggleDarkMode();
	setThemeColors();
});
