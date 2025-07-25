import { useEffect, useState, useCallback } from "react";
import SearchBar from "@/components/Weather/components/SearchBar";
import WeatherInfo from "@/components/Weather/components/WeatherInfo";
import weatherIcons from "@/components/Weather/components/weatherIcons";
import Loading from "@/components/Weather/components/Loading";

const Weather = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "City not found");
      }
      const data = await response.json();
      const icon =
        weatherIcons[data.weather[0].icon] || weatherIcons["default"];
      const {
        main: { humidity, temp },
        wind: { speed },
        name,
      } = data;

      setWeatherData({
        humidity,
        windSpeed: Math.round(speed),
        temperature: Math.round(temp),
        location: name,
        icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to load weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    search("Odesa");
  }, [search]);

  return (
    <div className="weather place-self-center p-10 rounded-xl flex flex-col items-center bg-diagonal-gradient">
      <SearchBar search={search} />

      {error && <p className="text-red-500 text-2xl font-bold mt-4">{error}</p>}

      {loading ? (
        <Loading />
      ) : (
        weatherData && <WeatherInfo weatherData={weatherData} />
      )}
    </div>
  );
};

export default Weather;
