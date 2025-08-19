const API_KEY = "a37246c223ab7122acd32ef33662f5f7";

async function getWeather() {
    console.log("getWeather called");
    const city = document.getElementById("city").value.trim();
    console.log("City input:", city);
    if (city === "") {
        alert("Please enter a city name!");
        console.log("No city entered, exiting function.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    console.log("API URL:", url);

    try {
        const response = await fetch(url);
        console.log("Fetch response received:", response);
        if (!response.ok) {
            console.log("Response not ok, throwing error.");
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log("API data:", data);

        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `${data.main.temp}°C`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weather").style.display = "block";
        console.log("Weather data displayed.");
    } catch (error) {
        console.log("Error caught:", error);
        alert(error.message);
    }
}