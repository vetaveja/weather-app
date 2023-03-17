let currentDate = document.querySelector("#current-date");
let date = new Date();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();
currentDate.innerHTML = `${day}, ${String(hour).padStart(2, "0")}:${String(
  minutes
).padStart(2, "0")}`;

let cityTemp = document.querySelector("#temperature");
let myCity = document.querySelector("#my-city");
let locationInput = document.querySelector("#location-input");
let myCityConditions = document.querySelector("#weather-conditions");
let myWeatherFeels = document.querySelector("#weather-feels");
let humidity = document.querySelector("#weather-humidity");
let pressure = document.querySelector("#weather-pressure");
let currentWeatherIcon = document.querySelector("#current-weather-icon");
let apiKey = "4f0e069tba9bdef6f3505aa3023cc7o5";

function weatherConditions(response) {
  myCity.innerHTML = response.data.city.toUpperCase();
  cityTemp.innerHTML = Math.round(response.data.temperature.current);
  myCityConditions.innerHTML = response.data.condition.description;
  myWeatherFeels.innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  pressure.innerHTML = `Pressure: ${response.data.temperature.pressure} hPa`;
  currentWeatherIcon.src = response.data.condition.icon_url;
}

//search form
function searchFormSubmit(event) {
  event.preventDefault();
  let cityName = locationInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherConditions);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormSubmit);

//current position
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric `;

  axios.get(apiUrl).then(weatherConditions);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentTemp);
