import _ from 'lodash';

https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=felixstowe&days=3

fetch('https://api.weatherapi.com/v1/forecast.json?key=5a27d69e27f140f58e7141821230211&q=felixstowe&days=3')
.then(function(response){
    return response.json();
})
.then(function(response) {
    const forecast = response.forecast;
    const forecastdayArray =  forecast.forecastday;

    forecastdayArray.forEach(function(day){
        console.log("Date: " + day.date);
        console.log("Moon Phase: " + day.astro.moon_phase);
        console.log("Min Temperature: " + day.day.mintemp_c + "°C");
        console.log("Max Temperature: " + day.day.maxtemp_c + "°C");
        if((day.day.mintemp_c > 20) && (day.day.avghumidity > 60)){
            console.log("Humidity: " + day.day.avghumidity);
        }
        if(day.day.daily_chance_of_rain > 50){
            console.log("Chance of rain: " + day.day.daily_chance_of_rain + "%");
        }
        if(day.day.daily_chance_of_snow > 50){
            console.log("Chance of snow: " + day.day.daily_chance_of_snow);
        }
        if(day.day.maxwind_mph > 30){
            console.log("Heavy winds possible today, Max windspeed: " + day.day.maxwind_mph);
        }
        console.log("");
    });
})
.catch(function(err){
    console.error(err);
});