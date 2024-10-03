function fetchWeather(place, latitude, longitude) {
    console.log("Fetcher data bro");
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Feil status: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        const weather = data.current_weather;
        const article = document.getElementById(place);
        article.innerHTML = `
            <h4>${place}</h4>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Windspeed: ${weather.windspeed} km/h</p>
            <p>Time: ${weather.time}</p>`;
        console.log(`Værdata for ${place} har blitt oppdatert`);
    })

}

function locationId() {
    fetchWeather("Bislett", 59.926160, 10.734290);
    fetchWeather("Gjøvik", 60.795429, 10.691630);
    fetchWeather("Lillehamar", 61.115273, 10.466231);
    fetchWeather("Ilseng", 60.7751068, 11.2220867);
    fetchWeather("Naxos", 37.06787812, 25.48241444);
    fetchWeather("Granka", 27.931, -15.606);
}

locationId();

setInterval(locationId, 10000);