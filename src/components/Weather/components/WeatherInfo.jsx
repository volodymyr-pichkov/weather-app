import { z } from "zod";
import humidity_icon from "@/assets/humidity.png";
import wind_icon from "@/assets/wind.png";

const WeatherDataSchema = z.object({
  icon: z.string().optional(),
  temperature: z.number(),
  location: z.string(),
  humidity: z.number().min(0).max(100),
  windSpeed: z.number().nonnegative(),
});

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) return null;

  try {
    WeatherDataSchema.parse(weatherData);
  } catch (e) {
    console.error("Ошибка в данных:", e.errors);
    return <p>Invalid weather data</p>;
  }

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-0">
      <img
        src={weatherData.icon}
        alt="Weather icon"
        className="w-20 h-20 sm:w-32 sm:h-32 mt-6 sm:mt-8"
      />
      <p className="text-white text-5xl sm:text-7xl">{weatherData.temperature}°C</p>
      <p className="text-white text-2xl sm:text-4xl">{weatherData.location}</p>
      <div className="w-full mt-6 sm:mt-9 text-white flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 text-xl sm:text-2xl justify-between max-w-md mx-auto">
        <div className="flex items-center sm:items-start gap-3">
          <img src={humidity_icon} alt="Humidity icon" className="w-5 sm:w-6 pt-1.5 sm:pt-2.5" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span className="text-sm sm:text-base">Humidity</span>
          </div>
        </div>
        <div className="flex items-center sm:items-start gap-3">
          <img src={wind_icon} alt="Wind icon" className="w-5 sm:w-6 pt-1.5 sm:pt-2.5" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span className="text-sm sm:text-base">Wind speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
