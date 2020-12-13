//changing the day and time
let day = document.querySelector("#current-date");
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let today = weekdays[now.getDay()];
day.innerHTML = `${today} ${hours}:${minutes}`;
//changing the date
let date = document.querySelector("#current-date-today");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let dateToday = now.getDate();
let year = now.getFullYear();
date.innerHTML = `${month} ${dateToday}, ${year}`;

//changing the city

function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".now").innerHTML = `${Math.round(
    response.data.main.temp)}°`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed)} mph`;
  document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#min").innerHTML = `Low ${Math.round(response.data.main.temp_min)}°`;
  document.querySelector("#max").innerHTML = `High ${Math.round(response.data.main.temp_max)}°`;
  document.querySelector("#feeling").innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°`;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-entered").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "243e61ef7bf0666ad76f473c226e9936";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let form = document.querySelector(".form-inline");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "243e61ef7bf0666ad76f473c226e9936";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", submitCurrentLocation);


