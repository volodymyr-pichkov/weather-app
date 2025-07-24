import humidity_icon from "@/assets/humidity.png";
import wind_icon from "@/assets/wind.png";

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
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
          <img src={humidity_icon} alt="Humidity icon" className="w-6 pt-2.5" />
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
  );
};

export default WeatherInfo;
