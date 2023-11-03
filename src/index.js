import './styles.css'
import _ from 'lodash';
import { format } from 'date-fns';

function component() {
    const windowDiv = document.createElement('div');
    windowDiv.className = "window-div";

    addDiv("header", windowDiv);

    for (let index = 1; index < 4; index++) {
        generateWeatherSection(("day-" + index), windowDiv);
    }


    loadWeather();


    return windowDiv;
}

document.body.appendChild(component());

function addDiv(className, appendThis){
    const sectionName = document.createElement('div');
    sectionName.className = className;
    appendThis.appendChild(sectionName);

    return sectionName;
}

function generateWeatherSection(id, appendThis){
    let weatherSection = addDiv("weather-section", appendThis);
    weatherSection.setAttribute('id', id);

    appendThis.appendChild(weatherSection);
    return weatherSection;
}

function getLocation(location){
    lowercaseLocation = location.toLowerCase();
    return "https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=" + lowercaseLocation + "&days=3";
}

function loadWeather(location = "felixstowe"){
    fetch('https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=felixstowe&days=3')
.then(function(response){
    return response.json();
})
.then(function(response) {
    const forecast = response.forecast;
    const forecastdayArray =  forecast.forecastday;

    forecastdayArray.forEach(function(day){
        const date = new Date(day.date);
        const formattedDate = format(date, 'eeee');
        console.log(formattedDate);
        console.log("Moon Phase: " + day.astro.moon_phase);
        console.log("Temperature: " + day.day.avgtemp_c + "°C");
        console.log("Condition: " + day.day.condition.text);
        console.log("Humidity: " + day.day.avghumidity + "%");
        if(day.day.daily_chance_of_rain > 50){
            console.log("Chance of rain: " + day.day.daily_chance_of_rain + "%");
        }
        if(day.day.daily_chance_of_snow > 50){
            console.log("Chance of snow: " + day.day.daily_chance_of_snow);
        }
        if(day.day.maxwind_mph > 30){
            console.log("High winds possible today, Max windspeed: " + day.day.maxwind_mph + "mph");
        }
        console.log("");
    });
})
.catch(function(err){
    console.error(err);
});
}

