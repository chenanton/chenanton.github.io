function toggleTheme() {
	let isDarkMode = localStorage.getItem("isDarkMode");
	localStorage.setItem("isDarkMode", (isDarkMode === "true") ? "false" : "true");
	setColors();
}

// document.getElementById("toggle-dark-mode").addEventListener("click", () => {
// 	toggleDarkMode();
// });
