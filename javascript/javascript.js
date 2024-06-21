async function search(text) {
    try {
        let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4494785c7ddb41c5a43113335242106&q=${text}&days=6`); // Update to forecast endpoint with days parameter
        if (data.ok) {
            let result = await data.json();
            displayCurrent(result.location, result.current);
            displayAnother(result.forecast.forecastday);
        } else {
            console.error('Failed to fetch weather data.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById("search").addEventListener("keyup", (text) => {
    search(text.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current != null) {
        var date = new Date(current.last_updated.replace(" ", "T"));
        let html = `
<div class="col-md-4 g-4 forecast-today">
    <div class="layout d-flex justify-content-between p-3">
        <p class="day">${days[date.getDay()]}</p>
        <p class="date">${date.getDate()} ${months[date.getMonth()]}</p>
    </div>
    <div class="the_content p-3">
        <p class="city">${location.name}</p>
        <h1 class="temp">${current.temp_c}<sup>°C</sup></h1>
        <img src="https:${current.condition.icon}" alt="weather icon" width="90">
        <p class="weather_condition">${current.condition.text}</p>
    </div>
</div>`;

        document.getElementById('forecast_current').innerHTML = html;
    }
}

function displayAnother(forecastDays) {
    let cartona = '';
    for (let i = 1; i < forecastDays.length; i++) {
        let forecast = forecastDays[i];
        let date = new Date(forecast.date);
        cartona += `
<div class="col-md-4 g-4 forecast">
    <div class="layout d-flex justify-content-center p-3">
        <p class="day">${days[date.getDay()]}</p>
    </div>
    <div class="the_content p-5 text-center">
        <img src="https:${forecast.day.condition.icon}" alt="weather icon" width="90">
        <h1 class="temp">${forecast.day.avgtemp_c}<sup>°C</sup></h1>
        <p class="weather_condition">${forecast.day.condition.text}</p>
    </div>
</div>`;
    }
    document.getElementById("forecast_current").innerHTML += cartona;
}

search("cairo");
