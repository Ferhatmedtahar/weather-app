import { useEffect, useState } from "react";
import "./index.css";

//0cbe651bad0bf87ca74dcd3897c3f5c3

// viewBox="0 0 480 510"
// fill="#fcc419"
// stroke="black"

const WeatherIcons = {
  Clear: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fcc419"
      stroke="black"
      viewBox="0 0 512 512"
    >
      <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
    </svg>
  ),
  Clouds: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#111111aa"
      stroke="black"
      viewBox="0 0 640 512"
    >
      <path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z" />
    </svg>
  ),
  Rain: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#111111cc"
      stroke="black"
      viewBox="0 0 512 512"
    >
      <path d="M96 320c-53 0-96-43-96-96c0-42.5 27.6-78.6 65.9-91.2C64.7 126.1 64 119.1 64 112C64 50.1 114.1 0 176 0c43.1 0 80.5 24.3 99.2 60c14.7-17.1 36.5-28 60.8-28c44.2 0 80 35.8 80 80c0 5.5-.6 10.8-1.6 16c.5 0 1.1 0 1.6 0c53 0 96 43 96 96s-43 96-96 96H96zM81.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6S-3.3 490.7 1.9 478.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm120 0c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6zm244.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6s17.8 19.3 12.6 31.5zM313.5 353.9c12.2 5.2 17.8 19.3 12.6 31.5l-48 112c-5.2 12.2-19.3 17.8-31.5 12.6s-17.8-19.3-12.6-31.5l48-112c5.2-12.2 19.3-17.8 31.5-12.6z" />
    </svg>
  ),
  Snow: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffffdd"
      stroke="grey"
      viewBox="0 0 448 512"
    >
      <path d="M224 0c17.7 0 32 14.3 32 32V62.1l15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49v70.3l61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.8 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7v70.3l49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V449.9l-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49V311.7l-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3V129.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15V32c0-17.7 14.3-32 32-32z" />
    </svg>
  ),
  Thunderstorm: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#111111cc"
      stroke="grey"
      viewBox="0 0 512 512"
    >
      <path d="M0 224c0 53 43 96 96 96h47.2L290 202.5c17.6-14.1 42.6-14 60.2 .2s22.8 38.6 12.8 58.8L333.7 320H352h64c53 0 96-43 96-96s-43-96-96-96c-.5 0-1.1 0-1.6 0c1.1-5.2 1.6-10.5 1.6-16c0-44.2-35.8-80-80-80c-24.3 0-46.1 10.9-60.8 28C256.5 24.3 219.1 0 176 0C114.1 0 64 50.1 64 112c0 7.1 .7 14.1 1.9 20.8C27.6 145.4 0 181.5 0 224zm330.1 3.6c-5.8-4.7-14.2-4.7-20.1-.1l-160 128c-5.3 4.2-7.4 11.4-5.1 17.8s8.3 10.7 15.1 10.7h70.1L177.7 488.8c-3.4 6.7-1.6 14.9 4.3 19.6s14.2 4.7 20.1 .1l160-128c5.3-4.2 7.4-11.4 5.1-17.8s-8.3-10.7-15.1-10.7H281.9l52.4-104.8c3.4-6.7 1.6-14.9-4.2-19.6z" />
    </svg>
  ),
  Drizzle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#111111dc"
      stroke="grey"
      viewBox="0 0 640 512"
    >
      <path d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l10.4 62.4c-23.3 10.8-42.9 28.4-56 50.3c-14.6-9-31.8-14.1-50.2-14.1c-53 0-96 43-96 96c0 35.5 19.3 66.6 48 83.2c.8 31.8 13.2 60.7 33.1 82.7l-56 39.2c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM208 144c13.8 0 26.7 4.4 37.1 11.9c-1.2 4.1-2.2 8.3-3 12.6c-37.9 14.6-67.2 46.6-77.8 86.4C151.8 243.1 144 226.5 144 208c0-35.3 28.7-64 64-64zm69.4 276c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm96 0c11 7.4 14 22.3 6.7 33.3l-32 48c-7.4 11-22.3 14-33.3 6.7s-14-22.3-6.7-33.3l32-48c7.4-11 22.3-14 33.3-6.7zm74.5-116.1c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" />
    </svg>
  ),
};

const getWeatherIcon = (weatherDescription) => {
  switch (weatherDescription) {
    case "Clear":
      return WeatherIcons.Clear;
    case "Clouds":
      return WeatherIcons.Clouds;
    case "Atmosphere":
      return WeatherIcons.Clouds;
    case "Rain":
      return WeatherIcons.Rain;
    case "Snow":
      return WeatherIcons.Snow;
    case "Thunderstorm":
      return WeatherIcons.Thunderstorm;
    case "Drizzle":
      return WeatherIcons.Drizzle;
    default:
      return WeatherIcons.Clear;
  }
};

export default function App() {
  const [city, setCity] = useState("");
  const [latLong, setLatLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKeyNinja = "rm55oBnbyPJW/kDiuKNvhQ==O01tSUaVV2kAZZxD";
  const apiKeyOpenWeatherMap = "9c550f8399ee14620a63e335a70dd936";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (city) {
          // Fetch city data
          const cityUrl = `https://api.api-ninjas.com/v1/city?name=${city}`;
          const response = await fetch(cityUrl, {
            headers: {
              "X-Api-Key": apiKeyNinja,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setLatLong(result?.[0]);

          // Fetch weather data using latLong
          if (result?.length > 0) {
            const { latitude, longitude } = result[0];
            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKeyOpenWeatherMap}`;

            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) {
              throw new Error(`HTTP error! status: ${weatherResponse.status}`);
            }

            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
          }
        }
      } catch (err) {
        setError(err.message);
        console.warn(err);
      }
    };

    fetchData();
  }, [city, apiKeyNinja, apiKeyOpenWeatherMap]);

  return (
    <div className="container">
      <Search city={city} setCity={setCity} />
      <Box weatherData={weatherData} />
      <WeatherList weatherData={weatherData}></WeatherList>
    </div>
  );
}

function Search({ city, setCity }) {
  return (
    <div className="searchContainer">
      {" "}
      <input
        type="text"
        placeholder="Enter a City..."
        className="search"
        value={city}
        onChange={(e) => {
          setCity(() => e.target.value);
        }}
      />
    </div>
  );
}

function Box({ weatherData }) {
  const status = weatherData?.list[0].weather[0].main;

  return (
    <div className="box">
      <Status status={status} />
      <Info weatherData={weatherData} />
    </div>
  );
}

function Status({ status }) {
  if (status) {
    return <div className="status">{getWeatherIcon(status)}</div>;
  }
}

function Info({ weatherData }) {
  if (weatherData) {
    return (
      <div className="information">
        <p>Today</p>
        <h1>{weatherData?.city.name}</h1>
        <p>
          temperature:{(weatherData?.list[0].main.temp - 273.15).toFixed(1)}°C
        </p>
        <p>{weatherData?.list[0].weather[0].description}</p>
      </div>
    );
  }
}

function WeatherList({ children, weatherData }) {
  let listdays = weatherData?.list;

  if (!listdays || listdays.length === 0) {
    listdays = [];
  } else {
    // prettier-ignore
    const [,,,,,,,firstday,,,,,,,,secondday,,,,,,,,thirdday,,,,,,,,fourthday]=listdays
    const days = [firstday, secondday, thirdday, fourthday];
    return (
      <div className="list">
        {days.map((data) => (
          <Item data={data} key={data.dt} />
        ))}
      </div>
    );
  }
}

function Item({ data }) {
  const timestamp = data.dt; // Unix timestamp
  // Convert Unix timestamp to milliseconds
  const milliseconds = timestamp * 1000;
  // Create a new Date object using the milliseconds
  const date = new Date(milliseconds);
  // prettier-ignore
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];

  return (
    <div className="list-item">
      <h4>{daysOfWeek[date.getDay()]}</h4>
      {getWeatherIcon(data.weather[0].main)}
      <p>{(data.main.temp - 273.15).toFixed(1)}°C</p>
    </div>
  );
}
