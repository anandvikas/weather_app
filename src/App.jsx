import { useCallback, useState, useEffect, createContext } from "react"
import WeatherCard from "./components/WeatherCard";
import { APIKEY } from "./utils/helper";
import Placeholder from "./components/Placeholder";
export const AppContext = createContext(null);


const App = () => {
  const [unit, setUnit] = useState("metric");
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResponse, setLocationResonse] = useState();
  const [locationError, setLocationError] = useState(null);
  const [weatherReport, setWeatherReport] = useState(null);

  // To get lat-lon of location
  const handleFetchWether = useCallback(async () => {
    setLocationError(null);
    let latLonData = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationQuery}&limit=1&appid=${APIKEY}`);
    latLonData = await latLonData.json();
    if (latLonData.length <= 0) {
      setLocationError("Please enter a valid location!");
      return
    }
    setLocationResonse(latLonData[0]);
  }, [locationQuery])

  // To get weather data of location
  const getWeatherData = useCallback(async () => {
    let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?units=${unit}&lat=${locationResponse.lat}&lon=${locationResponse.lon}&appid=${APIKEY}`);
    weatherData = await weatherData.json();
    let reportObj = {};
    weatherData.list.forEach((elem) => {
      let date = elem.dt_txt.split(" ")[0];
      if (reportObj[date]) {
        reportObj[date].push(elem)
      } else {
        reportObj[date] = [elem]
      }
    })
    setWeatherReport(reportObj);
  }, [locationResponse, unit])


  useEffect(() => {
    if (locationResponse) {
      getWeatherData()
    }
  }, [locationResponse, unit])


  return (
    <AppContext.Provider value={{ unit, setUnit, location: locationResponse, data: weatherReport }}>
      <div>
        <div className="input_container">
          <div>
            <label htmlFor="locationInput">Location * </label><br />
            <input id="locationInput" placeholder="Ex. Jaipur" value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} />
            <div className="err_msg">{locationError}</div>
          </div>
          <button onClick={handleFetchWether}>Find</button>
        </div>
        {
          weatherReport && locationResponse ? <WeatherCard /> : <Placeholder />
        }
      </div>
    </AppContext.Provider>
  )
}

export default App

