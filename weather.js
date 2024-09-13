import axios from "axios";

export function getWeather(lat, lon, timezone) {
    return axios.get("https://api.open-meteo.com/v1/forecast?latitude=59.3294&longitude=18.0687&hourly=temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&wind_speed_unit=ms&timeformat=unixtime&timezone=Europe%2FBerlin", {
        params : {
            latitude : lat,
            longitude : lon,
            timezone,
            current_weather: true, // parameter för att få med current_weather
        }
    })
    .then(({ data }) => {
        console.log(data);
        // const weatherData = Array.isArray(data) ? data[0] : data; // Får tydligen två arrayer som svar så måste hämta den som är aktuell...
        return {
            current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data),
        }
    });
};

function parseCurrentWeather({ current_weather, daily}) {

    if(!current_weather) {
        console.error("current_weather saknas i data");
        // return {};
    }

    const { 
        temperature : currentTemp,
        windspeed : windSpeed,
        weathercode : iconCode,
    } = current_weather;

    if(!daily) {
        console.error("daily saknas i data");
    }

    const {
        temperature_2m_max : [maxTemp],
        temperature_2m_min : [minTemp],
        apperant_temperature_max : [maxFeelsLike],
        apparant_temperature_min : [minFeelsLike],
        precipitation_sum : [percip],
    } = daily;

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp), 
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        percip: Math.round(percip * 100) / 100, // Avrundar till närmaste 100
        iconCode,
    }
};