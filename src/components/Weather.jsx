import { useEffect, useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();
      const icon = weatherIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.floor(data.wind.speed),
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search("Odesa");
  }, []);

  if (!weatherData) {
    return (
      <div className="place-self-center p-10 rounded-xl flex flex-col items-center bg-diagonal-gradient">
        <p className="text-white text-xl">Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="weather place-self-center p-10 rounded-xl flex flex-col items-center bg-diagonal-gradient">
      <div className="search-bar flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          aria-label="Search city or location"
          className="h-12 border-none outline-none rounded-[40px] pl-6 text-lg bg-input"
        />
        <img
          src={search_icon}
          alt="Search icon"
          className="w-12 p-4 rounded-full bg-input cursor-pointer"
        />
      </div>
      <div className="flex flex-col items-center gap-8">
        <img
          src={weatherData.icon}
          alt="Weather icon"
          className="w-32 h-32 mt-8"
        />
        <p className="text-white text-7xl">{weatherData.temperature}°C</p>
        <p className="text-white text-4xl">{weatherData.location}</p>
        <div className="w-full mt-9 text-white flex items-start gap-3 text-2xl justify-between">
          <div className="flex items-start gap-3">
            <img
              src={humidity_icon}
              alt="Humidity icon"
              className="w-6 pt-2.5"
            />
            <div>
              <p>{weatherData.humidity} %</p>
              <span className="text-base">Humidity</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <img src={wind_icon} alt="Wind icon" className="w-6 pt-2.5" />
            <div>
              <p>{weatherData.windSpeed} km/h</p>
              <span className="text-base">Wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
