import { getWeather } from "./weather";

getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    data => {
        console.log(data);
    }
);