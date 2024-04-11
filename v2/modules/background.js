// Document Queries
const root = document.querySelector("html");
const bodyContainer = document.querySelector("body");
const bgReset = document.querySelector(".reset");
const fullScreen = document.querySelector(".fullscreen-toggle");
const bgRefresh = document.querySelector(".bg-refresh");
const dropdownOptions = document.querySelector(".dropdown-options");
const backgroundCategories = ["nature", "city", "fruit", "animal"]

// Default Background Image
bodyContainer.style.backgroundImage = `url("${"./background/loading-background.svg"}")`;

// Get Background
const getBackground = async () => {
  const response = await fetch("https://source.unsplash.com/random");
  return response;
};
getBackground().then((response) => {
  const img = document.createElement("img");
  img.src = response.url;
  img.addEventListener("load", () => {
    bodyContainer.style.backgroundImage = `url("${img.src}")`;
    applyEffects();
  });
});

const getBackgroundFromCategory = async (category) => {
  const url = `https://source.unsplash.com/random/?${category}`
  const response = await fetch(url);
  return response;
}

// Create Dropdown Menu Options for Background Categories
const appendBackgroundOptions = () => {
  backgroundCategories.forEach((category) => {
    const newOption = document.createElement("button");
    const optionName = category.charAt(0).toUpperCase() + category.slice(1)
    const newSpan = document.createElement("span");
    newOption.className = "bg-option"
    newOption.textContent = optionName;
    // Background Refresh for Specific Category
    newOption.addEventListener("click", () => {
      // Set Default Background Until Image Loaded
      bodyContainer.style.backgroundImage = `url("${"./background/loading-background.svg"}")`;
      bodyContainer.style.backdropFilter = "";

      getBackgroundFromCategory(category).then((response) => {
        const img = document.createElement("img");
        img.src = response.url;
        img.addEventListener("load", () => {
          bodyContainer.style.backgroundImage = `url("${img.src}")`;
          applyEffects();
        });
      });
    })
    dropdownOptions.append(newOption);
  })
}
appendBackgroundOptions();

// Fullscreen Toggle
fullScreen.addEventListener("click", () => {
  if (root.fullscreenElement) root.requestFullscreen();
  else if (root.mozRequestFullScreen) root.mozRequestFullScreen();
  else if (root.webkitRequestFullscreen) root.webkitRequestFullscreen();
  else if (root.msRequestFullscreen) root.msRequestFullscreen();

  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.msExitFullscreen) document.msExitFullscreen();
});

// Background Refresh
bgRefresh.addEventListener("click", () => {
  // Set Default Background Until Image Loaded
  bodyContainer.style.backgroundImage = `url("${"./background/loading-background.svg"}")`;
  bodyContainer.style.backdropFilter = "";

  getBackground().then((response) => {
    const img = document.createElement("img");
    img.src = response.url;
    img.addEventListener("load", () => {
      bodyContainer.style.backgroundImage = `url("${img.src}")`;
      applyEffects();
    });
  });
});

// Background Effects Queries
const blur = document.querySelector("#range1");
const brightness = document.querySelector("#range2");
const contrast = document.querySelector("#range3");
const saturate = document.querySelector("#range4");
const grayscale = document.querySelector("#range5");
const sepia = document.querySelector("#range6");

// Default Values
let blurValue = 10;
let brightnessValue = 100;
let contrastValue = 100;
let saturateValue = 100;
let grayscaleValue = 0;
let sepiaValue = 0;

// Function for invoking when Range Slider is used
const applyEffects = () => {
  bodyContainer.style.backdropFilter = `blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturateValue}%) grayscale(${grayscaleValue}%) sepia(${sepiaValue}%)`;
};

// Background Effects Event Listener
blur.addEventListener("change", () => {
  blurValue = blur.value;
  applyEffects();
});

brightness.addEventListener("change", () => {
  brightnessValue = brightness.value;
  applyEffects();
});

contrast.addEventListener("change", () => {
  contrastValue = contrast.value;
  applyEffects();
});

saturate.addEventListener("change", () => {
  saturateValue = saturate.value;
  applyEffects();
});

grayscale.addEventListener("change", () => {
  grayscaleValue = grayscale.value;
  applyEffects();
});

sepia.addEventListener("change", () => {
  sepiaValue = sepia.value;
  applyEffects();
});

// Background Effect Reset
bgReset.addEventListener("click", () => {
  // Changing range value back to default
  blur.value = 10;
  brightness.value = 100;
  contrast.value = 100;
  saturate.value = 100;
  grayscale.value = 0;
  sepia.value = 0;

  let blurValue = 10;
  let brightnessValue = 100;
  let contrastValue = 100;
  let saturateValue = 100;
  let grayscaleValue = 0;
  let sepiaValue = 0;

  bodyContainer.style.backdropFilter = `blur(${blurValue}px) brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturateValue}%) grayscale(${grayscaleValue}%) sepia(${sepiaValue}%)`;
});

export {
  bodyContainer,
  bgRefresh,
  bgReset,
  getBackground,
  blur,
  brightness,
  contrast,
  saturate,
  grayscale,
  sepia,
  blurValue,
  brightnessValue,
  contrastValue,
  saturateValue,
  grayscaleValue,
  sepiaValue,
  applyEffects,
};