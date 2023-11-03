import './styles.css'
import _ from 'lodash';
import { format } from 'date-fns';

function component() {
    const windowDiv = document.createElement('div');
    windowDiv.className = "window-div";

    const header = addDiv("header", windowDiv);
    const locationDiv = addDiv("location-div", header);
    const searchBox = document.createElement("input");
    header.appendChild(searchBox);

    for (let index = 1; index < 4; index++) {
        generateWeatherSection(("day-" + index), windowDiv);
    }


    document.addEventListener("DOMContentLoaded", function () {
        fetch('https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=felixstowe&days=3')
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                // SETTING THE HEADER TEXT
                const forecast = response.forecast;
                const location = response.location.name + ", " + response.location.country;
                const forecastDayArray = forecast.forecastday;
                locationDiv.innerText = location;
                
                let index = 0;

                forecastDayArray.forEach(function (day, index) {
                    const date = new Date(day.date);
                    let formattedDate = format(date, 'eeee');
                    let moonPhase = day.astro.moon_phase;
                    let averageTemp = day.day.avgtemp_c;
                    let condition = day.day.condition.text;
                    let humidity = day.day.avghumidity;
                    let rainChance = day.day.daily_chance_of_rain;
                    let snowChance = day.day.daily_chance_of_snow;
                    let windspeed = day.day.maxwind_mph;

                    let dayDiv = document.getElementById(`day-${index + 1}`);
                    console.log(dayDiv);
                    dayDiv.querySelector(".day").textContent = formattedDate;
                    dayDiv.querySelector(".moon-phase").textContent = moonPhase;
                    dayDiv.querySelector(".temp-text").textContent = averageTemp;
                    dayDiv.querySelector(".condition").textContent = condition;
                    dayDiv.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
                    if(rainChance > 50){
                        dayDiv.querySelector(".rain").textContent = rainChance + "% chance of rain";
                    }
                    if(snowChance > 50){
                        dayDiv.querySelector(".snow").textContent = snowChance + "% chance of snow";
                    }
                    if(windspeed > 30){
                        dayDiv.querySelector(".winds").textContent = "High winds of " + windspeed + "mph possible";
                    }
                }
                );


                for (let index = 1; index < 4; index++) {
                    let weatherBox = document.getElementById(("day-" + index));



                }
            })
    });


    //loadWeather();

    return windowDiv;
}

document.body.appendChild(component());

function addDiv(className, appendThis) {
    const sectionName = document.createElement('div');
    sectionName.className = className;
    appendThis.appendChild(sectionName);

    return sectionName;
}

function generateWeatherSection(id, appendThis) {
    let weatherSection = addDiv("weather-section", appendThis);
    weatherSection.setAttribute('id', id);

    let dayAndMoonphase = addDiv("day-and-moonphase", weatherSection);
    addDiv("day", dayAndMoonphase);
    addDiv("moon-phase", dayAndMoonphase);

    let weatherBox = addDiv("weather-box", weatherSection);
    let temperature = addDiv("temperature", weatherBox);
    addDiv("temp-text", temperature);
    addDiv("temp-format", temperature);
    addDiv("vl", weatherBox);
    let details = addDiv("details", weatherBox);
    addDiv("condition", details);
    addDiv("humidity", details);
    addDiv("rain", details);
    addDiv("snow", details);
    addDiv("winds", details);

    appendThis.appendChild(weatherSection);
    return weatherSection;
}

function getLocation(location) {
    lowercaseLocation = location.toLowerCase();
    return "https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=" + lowercaseLocation + "&days=3";
}
