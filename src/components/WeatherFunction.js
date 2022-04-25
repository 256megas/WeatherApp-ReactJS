import axios from "axios";
import { useState, useEffect } from "react";
import apiKey from "../apiKey";

const WeatherFunction = (props) => {
  const [myWeather, setMyWeather] = useState({
    weatherData: null,
    status: null,
  });
  const [myCoords, setMyCoords] = useState({ lat: null, lon: null });

  useEffect(() => {
    getCoords();
    axios
      .get(
        "http://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey.key +
          "&q=" +
          myCoords.lat +
          "," +
          myCoords.lon +
          "&days=1&aqi=no&alerts=no"
      )
      .then((res) => {
        console.log(res.data);
        setMyWeather({ weatherData: res.data, status: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getCoords = (e) => {
    window.navigator.geolocation.watchPosition((position) => {
      setMyCoords({
        lat: position.coords.latitude.toFixed(4),
        lon: position.coords.longitude.toFixed(4),
      });
    });
  };

  return myWeather.status === "success" ? (
    <div id="weather">
      <h1>Weather Component</h1>
      <br />
      <p>Latitud: {myCoords.lat}</p>
      <p>Longitud: {myCoords.lon}</p>
      <br />
      <p>
        {myWeather.weatherData.location.name} (
        {myWeather.weatherData.location.region}-
        {myWeather.weatherData.location.country})
      </p>
      <br />
      <p>Last Updated: {myWeather.weatherData.current.last_updated}</p>
      <br />
      <p>
        {myWeather.weatherData.current.condition.text}
        <br />
        <img
          src={myWeather.weatherData.current.condition.icon}
          alt={myWeather.weatherData.current.condition.text}
        />
      </p>
    </div>
  ) : (
    <div id="weather">
      <h1>Loading</h1>
    </div>
  );
};

export default WeatherFunction;
