// Document Queries
const settings = document.querySelector(".settings");
const settingsIcon = document.querySelector(".settings-icon");
const closeButton = document.querySelector(".close");

// Open & Close Settings
settingsIcon.addEventListener("click", () => {
  settings.classList.remove("hidden");
  settingsIcon.classList.add("hidden");
});
closeButton.addEventListener("click", () => {
  settings.classList.add("hidden");
  settingsIcon.classList.remove("hidden");
});

export { settings, settingsIcon, closeButton };
