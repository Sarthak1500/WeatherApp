const button = document.getElementById('search-button');
const input = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');

async function getData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=400b8f05fdb3421e88d105313251303&q=${city}&aqi=no`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

button.addEventListener("click", async () => {
    const value = input.value.trim();
    if (value === "") {
        alert("Please enter a city name.");
        return;
    }

    const result = await getData(value);
    if (result && result.location) {
        cityName.innerText = `${result.location.name}, ${result.location.region}, ${result.location.country}`;
        cityTime.innerText = `Local Time: ${result.location.localtime}`;
        cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;

        input.value = ""; // ✅ Clears the search box after successful search
    } else {
        alert("City not found. Please try again.");
    }
});
