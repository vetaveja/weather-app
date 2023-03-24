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
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  
  
  forecast.forEach(function(forecastDay, index){
    if (index < 6) {
    forecastHTML = forecastHTML + 
    ` <div class="forecast-line">
        <div class="row">
          <div class="col">
            <h3 class="forecast-line-header">${formatDay(forecastDay.time)}</h3>
          </div>
          <div class="col">
            <img class="weather-icon weather-icon--forecast" src="${forecastDay.condition.icon_url}" alt="${forecastDay.condition.icon}"/>
          </div>
          <div class="col-6">
            <p class="weather-forecast">Min: ${Math.round(forecastDay.temperature.minimum)}° | Max: ${Math.round(forecastDay.temperature.maximum)}°</p>
          </div>
        </div>
      </div>`;
    }
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
let wind = document.querySelector("#weather-wind");
let currentWeatherIcon = document.querySelector("#current-weather-icon");
let apiKey = "4f0e069tba9bdef6f3505aa3023cc7o5";

function getForecast(cityName) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsius = response.data.temperature.current;
  myCity.innerHTML = response.data.city.toUpperCase();
  cityTemp.innerHTML = Math.round(celsius);
  myCityConditions.innerHTML = response.data.condition.description;
  myWeatherFeels.innerHTML = `Feels like ${Math.round(
    response.data.temperature.feels_like
  )}°`;
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  pressure.innerHTML = `Pressure: ${response.data.temperature.pressure} hPa`;
  wind.innerHTML = `Wind speed: ${response.data.wind.speed} km/h`;
  currentWeatherIcon.src = response.data.condition.icon_url;

  getForecast(response.data.city);
}


//search form
function searchFormSubmit(city) {
  
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = locationInput.value;
  searchFormSubmit(cityName);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


//current position
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displayTemperature);
}

function currentTemp() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector("#current");
currentBtn.addEventListener("click", currentTemp);

searchFormSubmit("London");

// let celsius = null;

// function showFarengheit(event) {
//   event.preventDefault();
//   let farengheit = (celsius * 1.8) + 32;
//   cityTemp.innerHTML = Math.round(farengheit);
//   farengheitLink.classList.add("active");
//   celsiusLink.classList.remove("active");
// }

// function showCelsius(event) {
//   event.preventDefault();
//   cityTemp.innerHTML = Math.round(celsius);
//   celsiusLink.classList.add("active");
//   farengheitLink.classList.remove("active");
// }


// let farengheitLink = document.querySelector("#farengheit");
// farengheitLink.addEventListener("click", showFarengheit);

// let celsiusLink = document.querySelector("#celsius");
// celsiusLink.addEventListener("click", showCelsius);