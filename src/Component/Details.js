import { useState } from "react";
import "./Details.css";

function Detail() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState(null);
  const [res, setRes] = useState(null);
  const [buton, SetButton] = useState(true);
  const [weather, setWeather] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchData = (e) => {
    setLoad(true);
    e.preventDefault();
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        setRes(data);
        if (data) {
          setCity(data[0].capital);
        }
        setLoad(false);
      });
  };

  const getWeather = () => {
    setLoad(true);
    fetch(
      `http://api.weatherstack.com/current?access_key=c026ab63a94dcff27f0a4acb03a40b35&query=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoad(false);
      });
  };

  const searchfunc = (e) => {
    setCountry(e.target.value);
    {
      e.target.value === "" ? SetButton(true) : SetButton(false);
    }
    setRes(null);
  };
  return (
    <div className='Detail'>
      <h1 style={{ color: "white" }}>Weather App</h1>

      {/* TO prevent nested block rendering */}
      {!res && (
        <>
          <form className='box'>
            {load === true && <h1>Loading...</h1>}
            <input
              placeholder='Country Name'
              className='input'
              type='text'
              value={country}
              //   onChange={(e) => setCountry(e.target.value)}
              onChange={(e) => searchfunc(e)}
            />
            <button
              className='btn'
              disabled={buton}
              onClick={(e) => fetchData(e)}
            >
              Search
            </button>
          </form>
        </>
      )}

      {!weather &&
        res &&
        res.map((data, key) => {
          return (
            <div className='box' key={key}>
              {load === true && <h1>Loading....</h1>}

              <img
                src={data.flags.png}
                name='flag'
                alt='flagimage'
                className='image'
              />
              <h3>Capital: {data.capital}</h3>
              <h3>Population: {data.population}</h3>
              <h3>
                Latitude:{data.latlng[0]} longitude:{data.latlng[1]}
              </h3>

              <button className='btn' onClick={getWeather}>
                Capital Weather
              </button>
            </div>
          );
        })}
      {!weather && res?.status === 404 && (
        <div className='box'>
          {load === true && <h1>Loading...</h1>}
          <h1>Not Found</h1>
        </div>
      )}
      {weather && (
        <div className='box'>
          {load === true && <h1>Loading....</h1>}
          <h1>Weather in {city}</h1>
          <h3>Temperature: {weather.current.temperature}°C </h3>
          {/* <h3>Temperature: {weather.main.temp}</h3> */}
        </div>
      )}
    </div>
  );
}

export default Detail;
