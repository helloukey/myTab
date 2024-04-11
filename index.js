// Background Document Queries
const root = document.querySelector("html");
const bodyContainer = document.querySelector("body");
const bgReset = document.querySelector(".reset");
const fullScreen = document.querySelector(".fullscreen-toggle");
const bgRefresh = document.querySelector(".bg-refresh");
const settings = document.querySelector(".settings");
const settingsIcon = document.querySelector(".settings-icon");
const closeButton = document.querySelector(".close");
const container = document.querySelector(".container");
const dropdownOptions = document.querySelector(".dropdown-options");
const backgroundCategories = ["nature", "city", "fruit", "animal"];

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

// Get Random Background from Categories
const getBackgroundFromCategory = async (category) => {
  const url = `https://source.unsplash.com/random/?${category}`;
  const response = await fetch(url);
  return response;
};

// Create Dropdown Menu Options for Background Categories
const appendBackgroundOptions = () => {
  backgroundCategories.forEach((category) => {
    const newOption = document.createElement("button");
    const optionName = category.charAt(0).toUpperCase() + category.slice(1);
    // const newSpan = document.createElement("span");
    newOption.className = "bg-option";
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
    });
    dropdownOptions.append(newOption);
  });
};
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

// Open & Close Settings
settingsIcon.addEventListener("click", () => {
  settings.classList.remove("hidden");
  settingsIcon.classList.add("hidden");
});
closeButton.addEventListener("click", () => {
  settings.classList.add("hidden");
  settingsIcon.classList.remove("hidden");
});

// Draggable Container
const drag = ({ movementX, movementY }) => {
  const getStyles = window.getComputedStyle(container);
  const left = parseInt(getStyles.left);
  const top = parseInt(getStyles.top);
  container.style.left = `${left + movementX}px`;
  container.style.top = `${top + movementY}px`;
};
container.addEventListener("mousedown", () => {
  container.addEventListener("mousemove", drag);
});
container.addEventListener("mouseup", () => {
  container.removeEventListener("mousemove", drag);
});

// Weather Document Queries
const weatherIcon = document.querySelector("img");
const weatherText = document.querySelector(".weather-text");
const temperatureText = document.querySelector(".temperature");
const locationText = document.querySelector(".location");

// Get Weather
const getWeather = async (latitude, longitude) => {
  const apiKey = "0100c8c16feb40579b580748220702";
  const baseURI = "https://api.weatherapi.com/v1/current.json?key=";
  const query = `&q=${latitude},${longitude}&aqi=no`;
  const request = await fetch(baseURI + apiKey + query);
  const response = await request.json();
  return response;
};
// Update Weather
const updateWeather = (response) => {
  weatherIcon.src = `https:${response.current.condition.icon}`;
  locationText.textContent = response.location.name;
  const tempText = `${response.current.temp_c}° C`;
  temperatureText.textContent = tempText;
  weatherText.textContent = response.current.condition.text;
};
// Gets Latitude and Longitude and Passes to getWeather Function
const sucessCallback = (position) => {
  getWeather(position.coords.latitude, position.coords.longitude)
    .then((response) => {
      updateWeather(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Getting & Passing Current Position
navigator.geolocation.getCurrentPosition(sucessCallback);

// Date Document Queries
const timeContainer = document.querySelector(".time");
const dateContainer = document.querySelector(".date");

setInterval(() => {
  // eslint-disable-next-line no-undef
  timeContainer.textContent = dayjs().format("h:mm A");
}, 1000);

setInterval(() => {
  // eslint-disable-next-line no-undef
  dateContainer.textContent = dayjs().format("MMMM D, YYYY");
}, 1000);

// Quote Document Queries
const loader = document.querySelector(".loader");
// const quoteContainer = document.querySelector(".quote-container");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const copy = document.querySelector(".copy");
const refresh = document.querySelector(".refresh");

// Loader Show & Hide
const loaderShow = () => {
  quote.classList.add("hidden");
  author.classList.add("hidden");
  loader.classList.remove("hidden");
};

const loaderHide = () => {
  if (!loader.classList.contains("hidden")) {
    quote.classList.remove("hidden");
    author.classList.remove("hidden");
    loader.classList.add("hidden");
  }
};

// Get Quote
const getQuote = async () => {
  loaderShow();
  const URL = await fetch("https://api.quotable.io/random");
  const response = await URL.json();
  return response;
};

// Updating the Quote
const updateQuote = (response) => {
  quote.textContent = response.content;
  author.textContent = `- ${response.author}`;
  if (response.content.length) {
    loaderHide();
  }
};

getQuote()
  .then((response) => {
    updateQuote(response);
  })
  .catch((err) => {
    console.log(err);
  });

// Storing Quote and Author name to clipboard
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quote.textContent} ${author.textContent}`);
  alert("Quote copied to your clipboard");
});

// Reloading new quote
refresh.addEventListener("click", () => {
  getQuote()
    .then((response) => {
      updateQuote(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
