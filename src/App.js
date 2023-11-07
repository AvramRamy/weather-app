import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  function getWeather() {
    const apiKey = '12aef17e5c0175e8d66b29172c919434';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let MT = Math.round(data.main.temp);
        let FL = Math.round(data.main.feels_like);
        const weather = {
          location: `Weather in ${data.name}`,
          temperature: `Temperature: ${MT} °C`,
          feelsLike: `Feels Like: ${FL} °C`,
          humidity: `Humidity: ${data.main.humidity} %`,
          wind: `Wind: ${data.wind.speed} km/h`,
          condition: `Weather Condition: ${data.weather[0].description}`,
        };
        setWeatherInfo(weather);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-4">
          <div className="card">
            <h1 className="card-header text-center bg-primary text-white">
              Weather App
            </h1>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City Name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  onClick={getWeather}
                  className="btn btn-primary"
                  type="button"
                >
                  Get Weather
                </button>
              </div>

              {weatherInfo && (
                <div className="weather-info">
                  <h3>{weatherInfo.location}</h3>
                  <p>{weatherInfo.temperature}</p>
                  <p>{weatherInfo.feelsLike}</p>
                  <p>{weatherInfo.humidity}</p>
                  <p>{weatherInfo.wind}</p>
                  <p>{weatherInfo.condition}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
