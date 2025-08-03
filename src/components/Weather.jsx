import "./Weather.css"
import search_icon from "../assets/search.png"
import humidity_icon from "../assets/humidity.png"
import wind_icon from "../assets/wind.png"
import { useEffect, useRef, useState } from "react"

const Weather = () => {
    const user_input = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const search_city = async (city) => {
        if(city === "") {
            alert("City Name Not Entered");
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            const fetch_response = await fetch(url);
            const response_data = await fetch_response.json();

            if(!fetch_response.ok) {
                alert(response_data.message);
                return;
            }

            const image_icon_url = `https://openweathermap.org/img/wn/${response_data.weather[0].icon}@2x.png`;
            setWeatherData({
                humidity: response_data.main.humidity,
                wind_speed: response_data.wind.speed,
                temperature: Math.floor(response_data.main.temp),
                location_city: response_data.name,
                weather_icon: image_icon_url
            });
            
            
        } catch(error) {
            setWeatherData(false);
            console.error("Couldn't fetch weather data");
        }
    }

    return(
        <div className="weather">
            <div className="search-bar">
                <input ref={user_input} type="text" placeholder="Search your city"/>
                <img src={search_icon} alt="" onClick={()=>search_city(user_input.current.value)}/>
            </div>

            {weatherData?<>
                <img src={weatherData.weather_icon} alt="" className="weather-icon"/>

            <p className="temperature">{weatherData.temperature}° C</p>

            <p className="location">{weatherData.location_city}</p>

            <div className="weather-data">
                <div className="data">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="data">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.wind_speed} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
            </>:<></>}
        </div>
    );
}

export default Weather;