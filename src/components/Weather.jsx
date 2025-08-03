import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import { useEffect } from "react"

const Weather = ()=> {
    const search = async (city)=> {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
            
            const fetch_response = await fetch(url);
            const reponse_data = await fetch_response.json();
            console.log(reponse_data);
        } catch(error) {

        }
    }
    useEffect(()=>{
        search("London");
    }, [])

    return(
        <div className="weather">
            <div className="search-bar">
                <input type="text" placeholder="Search your city"/>
                <img src={search_icon} alt="" />
            </div>

            <img src={clear_icon} alt="" className="weather-icon"/>

            <p className="temperature">22° C</p>

            <p className="location">New Jersey</p>

            <div className="weather-data">
                <div className="data">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>91 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="data">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>2.2 Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;