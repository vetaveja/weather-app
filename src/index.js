
  let currentDate = document.querySelector("#current-date");
  let date = new Date();
  let days = [
    
    "Sunday",
    "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
let hour = date.getHours();
let minutes = date.getMinutes();
currentDate.innerHTML = `${day}, ${String(hour).padStart(2, "0")}:${String(
  minutes
).padStart(2, "0")}`;


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = forecastElement.innerHTML;
  
  forecast.forEach(function(forecastDay){
    forecastHTML = forecastHTML + `
  <div class="col-2">
    <h3>${formatDay(forecastDay.time)}</h3>
    <img class="weather-icon weather-icon--forecast" src="${forecastDay.condition.icon_url}" alt="${forecastDay.condition.icon}"/>
    <p class="weather-forecast">${forecastDay.temperature.minimum}° | ${forecastDay.temperature.maximum}°</p>
  </div>
  `;
  });
  
  forecastElement.innerHTML = forecastHTML;
}

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
  celsius = response.data.temperature.current;
  myCity.innerHTML = response.data.city.toUpperCase();
  cityTemp.innerHTML = Math.round(celsius);
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
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(weatherConditions);
  axios.get(apiForecastUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchFormSubmit);

//current position
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric `;
  let apiForecastUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric `;
  axios.get(apiUrl).then(weatherConditions);
  axios.get(apiForecastUrl).then(displayForecast);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentTemp);


let celsius = null;

function showFarengheit(event) {
  event.preventDefault();
  let farengheit = (celsius * 1.8) + 32;
  cityTemp.innerHTML = Math.round(farengheit);
  farengheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function showCelsius(event) {
  event.preventDefault();
  cityTemp.innerHTML = Math.round(celsius);
  celsiusLink.classList.add("active");
  farengheitLink.classList.remove("active");
}


let farengheitLink = document.querySelector("#farengheit");
farengheitLink.addEventListener("click", showFarengheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);