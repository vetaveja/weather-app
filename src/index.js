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
let weatherForecast = document.querySelector("#weather-forecast");
let apiKey = "cef48a792630af87b35b111e3f85bd9c";

function weatherConditions(response) {
  myCity.innerHTML = response.data.name.toUpperCase();
  cityTemp.innerHTML = Math.round(response.data.main.temp);
  myCityConditions.innerHTML = response.data.weather[0].main;
  myWeatherFeels.innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°`;
  weatherForecast.innerHTML = `H: ${Math.round(
    response.data.main.temp_max
  )}° | L: ${Math.round(response.data.main.temp_min)}°`;
}

//search form
function searchFormSubmit(event) {
  event.preventDefault();
  let cityName = locationInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherConditions);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormSubmit);

//current position
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric `;

  axios.get(apiUrl).then(weatherConditions);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentTemp);
