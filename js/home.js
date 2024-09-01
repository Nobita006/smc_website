// Fetch Air Quality Data
async function fetchAirQuality() {
    const apiKey = '/RadM/mLFGB7/cc85mj+oQ==pMfQPHvH2qTPqHUg'; // Replace with your actual API key
    const city = 'Qatar';
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/airquality?city=${city}`, {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the response to understand its structure

        // Clear any existing content
        const weatherDataElement = document.getElementById('weatherData');
        weatherDataElement.innerHTML = ''; // Clear previous content

        // Display air quality data in a more organized format
        const airQualityInfo = [
            `Overall AQI: ${data.overall_aqi}`,
            `PM2.5: ${data["PM2.5"].concentration} µg/m³ (AQI: ${data["PM2.5"].aqi})`,
            `PM10: ${data["PM10"].concentration} µg/m³ (AQI: ${data["PM10"].aqi})`,
            `O3: ${data.O3.concentration} µg/m³ (AQI: ${data.O3.aqi})`
        ];

        // Create list items for each piece of information
        airQualityInfo.forEach(info => {
            const li = document.createElement('li');
            li.textContent = info;
            weatherDataElement.appendChild(li);
        });
    } catch (error) {
        document.getElementById('weatherData').innerHTML = '<li>Failed to load air quality data.</li>';
        console.error('Error fetching air quality:', error);
    }
}

// Fetch Daily Fact
async function fetchDailyFact() {
    const apiKey = '/RadM/mLFGB7/cc85mj+oQ==pMfQPHvH2qTPqHUg'; // Replace with your actual API key

    try {
        const response = await fetch('https://api.api-ninjas.com/v1/facts', {
            headers: { 'X-Api-Key': apiKey }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the response to understand its structure

        // Display the first fact from the response
        document.getElementById('quoteData').textContent = data[0].fact;
    } catch (error) {
        document.getElementById('quoteData').textContent = 'Failed to load fact.';
        console.error('Error fetching fact:', error);
    }
}

// Call the functions to fetch and display data
fetchAirQuality();
fetchDailyFact();

// List of available pages with their titles
const pages = [
    { title: "Home", url: "home.html" },
    { title: "Campaign Info", url: "information.html" },
    { title: "Most Popular Apps", url: "apps.html" },
    { title: "How Parents Can Help", url: "parents.html" },
    { title: "Livestreaming", url: "livestreaming.html" },
    { title: "Contact", url: "contact.html" },
    { title: "Legislation", url: "legislation.html" }
];

// Search function
function searchFunction() {
    const input = document.getElementById("searchBar").value.toLowerCase();
    const resultsDiv = document.getElementById("searchResults");
    
    // Clear previous results
    resultsDiv.innerHTML = '';
    
    if (input) {
        // Filter pages based on the input
        const filteredPages = pages.filter(page => page.title.toLowerCase().includes(input));

        // If there are matches, show the results
        if (filteredPages.length > 0) {
            resultsDiv.style.display = 'block';
            filteredPages.forEach(page => {
                const resultItem = document.createElement('div');
                resultItem.textContent = page.title;
                resultItem.className = 'search-result-item';
                resultItem.onclick = () => {
                    window.location.href = page.url;
                };
                resultsDiv.appendChild(resultItem);
            });
        } else {
            resultsDiv.style.display = 'none';
        }
    } else {
        resultsDiv.style.display = 'none';
    }
}
