const searchButton = document.querySelector(".search-box button");
const input = document.querySelector(".search-box input");

searchButton.addEventListener("click", () => {
    if (!input.value) {
        alert("Please Type Something!!!");
    }
    else {
        const key = '4a3859186dbabdd652e466a270aab3ec';
        const city = input.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`).then(response => response.json()).then(json => {

            const weatherImg = document.querySelector(".weather-img");
            const temperaure = document.querySelector(".temperaure");
            const infoHumidity = document.querySelector(".infoHumidity");
            const infoWind = document.querySelector(".infoWind");
            const description = document.querySelector(".description");

            switch (json.weather[0].main) {
                case 'Clear':
                    weatherImg.src = "images/clear.png";
                    break;
                case 'Rain':
                    weatherImg.src = "images/rain.png";
                    break;
                case 'Clouds':
                    weatherImg.src = "images/cloud.png";
                    break;
                case 'Snow':
                    weatherImg.src = "images/snow.png";
                    break;
                case 'Mist':
                    weatherImg.src = "images/mist.png";
                    break;
                case 'Haze':
                    weatherImg.src = "images/haze.png";
                    break;
                default:
                    weatherImg.src = "images/cloud.png";
                    break;
            }
            temperaure.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            infoHumidity.innerHTML = `${json.main.humidity}%`;
            infoWind.innerHTML = `${json.wind.speed}km/h`;
        })
    }
})