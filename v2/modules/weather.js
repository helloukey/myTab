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

export {
  weatherText,
  temperatureText,
  locationText,
  getWeather,
  updateWeather,
  sucessCallback,
};
