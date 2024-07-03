# Weather App

A weather forecasting application that allows users to search for a city and get weather information for the next four days. The app uses the OpenWeather API to fetch weather data and displays it with beautiful styling.

## Features

- **City Search**: Users can search for a city using a search bar.
- **Latitude and Longitude Fetching**: The app fetches the latitude and longitude of the searched city using the API Ninjas City API.
- **Weather Forecast**: Displays weather information for the next four days, including temperature, weather conditions, and corresponding icons.
- **Beautiful Styling**: User-friendly interface with icons representing different weather conditions.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **OpenWeather API**: For fetching weather data.
- **API Ninjas City API**: For fetching city latitude and longitude data.
- **CSS**: For styling the application.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd weather-app
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your API keys:
    ```env
    REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
    REACT_APP_API_NINJAS_KEY=your_api_ninjas_key
    ```

### Running the App

1. Start the development server:
    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `public/`: Contains the public assets and the main `index.html`.
- `src/`: Contains the source code of the application.
  - `components/`: Contains the React components.
  - `App.js`: The main component.
  - `index.js`: Entry point of the application.
  - `WeatherComponent.js`: Component for displaying weather icons and information.
  - `api.js`: Utility for making API requests.

## Usage

1. Enter the name of a city in the search bar.
2. The app will fetch the latitude and longitude of the city using the API Ninjas City API.
3. The app will then fetch the weather data for the next four days using the OpenWeather API.
4. The weather information, including temperature and conditions, will be displayed with corresponding icons.

## Code Snippets

### Fetching Weather Data

```javascript
const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
  );
  const data = await response.json();
  return data;
};
```
