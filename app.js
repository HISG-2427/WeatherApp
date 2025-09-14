const searchButton = document.querySelector(".search-box button");
const input = document.querySelector(".search-box input");
const additionalInfo = document.querySelector(".additional-info");
const weatherInfo = document.querySelector(".weather-info");
const notFound = document.querySelector(".not-found");
const container = document.querySelector(".container");

searchButton.addEventListener("click", (e) => {
    e.preventDefault(); 

    if (!input.value) {
        alert("Please Type Something!!!");
    }
    else {
        container.style.top = "10px";

        const key = '4a3859186dbabdd652e466a270aab3ec';
        const city = input.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`).then(response => response.json()).then(json => {

            if (json.cod == "404") {
                container.style.height = "500";
                notFound.style.visibility = "visible";
                additionalInfo.style.visibility = "hidden";
                weatherInfo.style.visibility = "hidden";
                return;
            }

            const weatherImg = document.querySelector(".weather-img");
            const temperature = document.querySelector(".temperature");
            const infoHumidity = document.querySelector(".info-humidity");
            const infoWind = document.querySelector(".info-wind");
            const description = document.querySelector(".description");

            notFound.style.visibility = "hidden";
            additionalInfo.style.visibility = "visible";
            weatherInfo.style.visibility = "visible";

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
            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description.toUpperCase()}`;
            infoHumidity.innerHTML = `${json.main.humidity}%`;
            infoWind.innerHTML = `${json.wind.speed}km/h`;
        })
    }
})
