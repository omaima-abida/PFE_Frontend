import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Weather.scss';

const cities = ['Tunis', 'Sfax', 'Sousse ,tn', 'Gabes', 'Bizerte'];

const Weather = () => {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
      const fetchWeather = async () => {
        const apiKey = '8316d0b5da044675a89180729242205'; // Replace with your WeatherAPI key
        const responses = await Promise.all(
          cities.map(city =>
            axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
          )
        );
        setWeatherData(responses.map(response => response.data));
      };
  
      fetchWeather();
    }, []);

    return (
        <div className="weather-container">
          <h2>Weather in Major Cities of Tunisia</h2>
          <div className="weather-cards">
            {weatherData.map((data, index) => (
              <div key={index} className="weather-card">
                <h3>{data.location.name}</h3>
                <p>{data.current.condition.text}</p>
                <p>Temperature: {data.current.temp_c}°C</p>
                <p>Humidity: {data.current.humidity}%</p>
                <p>Wind: {data.current.wind_kph} kph</p>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default Weather;
