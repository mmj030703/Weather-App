const input = document.querySelector('.input');
const search = document.querySelector('.search');
const appBody = document.querySelector('main');
const errorStatement = document.querySelector('.notfound');

const updateWeatherImage = (weather) => {
    if(weather == "Clouds") {
        document.querySelector('.temperature_image').src = "./images/clouds.png";
    }
    else if(weather == "Clear") {
        document.querySelector('.temperature_image').src = "./images/clear.png";
    }
    else if(weather == "Drizzle") {
        document.querySelector('.temperature_image').src = "./images/drizzle.png";
    }
    else if(weather == "Mist") {
        document.querySelector('.temperature_image').src = "./images/mist.png";
    }
    else if(weather == "Rain") {
        document.querySelector('.temperature_image').src = "./images/rain.png";
    }
    else if(weather == "Snow") {
        document.querySelector('.temperature_image').src = "./images/snow.png";
    }
}

const startWeatherApp = async (city) => {
    const apiKey = 'f52a2da1bf1b51e46193b4919e833d01';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(apiURL);
    const weatherObj = await weatherData.json();

    if (weatherData.status === 404) {
        appBody.style.display = "none";
        errorStatement.style.display = "block";

        input.value = "";
    }
    else {
        const cityName = document.querySelector('.city_name');
        const temperature = document.querySelector('.temperature');
        const humidity = document.querySelector('.humidity_value');
        const windSpeed = document.querySelector('.wind_speed');

        cityName.textContent = weatherObj.name;
        temperature.textContent = Math.round(weatherObj.main.temp) + '°c';
        humidity.textContent = weatherObj.main.humidity + "%";
        windSpeed.textContent = weatherObj.wind.speed + " Km/h";

        updateWeatherImage(weatherObj.weather[0].main);
        console.log(weatherObj.weather[0].main);
        appBody.style.display = "flex";
        errorStatement.style.display = "none";

        input.value = "";
    }
};

search.addEventListener('click', () => {
    startWeatherApp(input.value);
});

input.addEventListener('keypress', (eventObj) => {
    if (eventObj.key == "Enter") {
        startWeatherApp(input.value);
    }
});
