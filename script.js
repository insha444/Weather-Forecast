// 🌤 Change Theme Logic
function changeTheme() {
  const theme = document.getElementById("themeSelector").value;

  switch (theme) {
    case "light":
      document.documentElement.style.setProperty('--bg', '#ffffff');
      document.documentElement.style.setProperty('--text', '#000000');
      document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.9)');
      document.documentElement.style.setProperty('--accent', '#0077b6');
      document.documentElement.style.setProperty('--background-img', "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')");
      break;
    case "sky":
      document.documentElement.style.setProperty('--bg', '#e0f7fa');
      document.documentElement.style.setProperty('--text', '#004d40');
      document.documentElement.style.setProperty('--card-bg', 'rgba(255,255,255,0.95)');
      document.documentElement.style.setProperty('--accent', '#0288d1');
      document.documentElement.style.setProperty('--background-img', "url('https://images.unsplash.com/photo-1549880181-56a44cf4a9a2')");
      break;
    case "monsoon":
      document.documentElement.style.setProperty('--bg', '#263238');
      document.documentElement.style.setProperty('--text', '#ffffff');
      document.documentElement.style.setProperty('--card-bg', 'rgba(38,50,56,0.85)');
      document.documentElement.style.setProperty('--accent', '#4fc3f7');
      document.documentElement.style.setProperty('--background-img', "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')");
      break;
  }

  document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--bg');
  document.body.style.backgroundImage = getComputedStyle(document.documentElement).getPropertyValue('--background-img');
}

// 🧭 Map of State → Visual Crossing Location
const stateMap = {
  delhi: "delhi",
  maharashtra: "Maharashtra",
  karnataka: "Karnataka",
  "tamil-nadu": "tamil nadu",
  rajasthan: "rajasthan"
};

// 🔗 Visual Crossing Weather API Integration
function getWeather() {
  const stateKey = document.getElementById("stateSelect").value.toLowerCase();
  const location = stateMap[stateKey];

  // For simplicity, you can use hardcoded coordinates or use a geocoding API for better accuracy
  const coordinates = {
    delhi: { lat: 28.6139, lon: 77.2090 },
    maharashtra: { lat: 19.7515, lon: 75.7139 },
    karnataka: { lat: 15.3173, lon: 75.7139 },
    "tamil-nadu": { lat: 11.1271, lon: 78.6569 },
    rajasthan: { lat: 27.0238, lon: 74.2179 }
  };

  const { lat, lon } = coordinates[stateKey];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`;

  document.getElementById("weatherResult").innerHTML = "🔄 Fetching weather data...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const today = data.daily;
      document.getElementById("weatherResult").innerHTML = `
        <h2>📍 ${location}</h2>
        <p><strong>Today Max:</strong> ${today.temperature_2m_max[0]} °C</p>
        <p><strong>Today Min:</strong> ${today.temperature_2m_min[0]} °C</p>
        <p><strong>Precipitation:</strong> ${today.precipitation_sum[0]} mm</p>
        <p><strong>Now:</strong> ${data.current_weather.temperature} °C, Wind ${data.current_weather.wind_speed} km/h</p>
      `;
    })
    .catch(err => {
      document.getElementById("weatherResult").innerHTML = `<p>⚠️ ${err.message}</p>`;
    });
}
