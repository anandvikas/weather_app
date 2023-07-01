import { useContext } from "react";
import { weatherIcon } from "../utils/helper";
import { AppContext } from "../App";
import moment from "moment";

const Deatils = ({ data }) => {
    const { unit, setUnit, location } = useContext(AppContext);
    return (
        <div className="details">
            <div>
                <div className="details_main">
                    <img className="detail_img" src={`image/${weatherIcon[data.weather[0].main]}`} alt="" />
                    <div className="details_master">
                        <h1 className="detail_temp">{Math.round(data.main.temp)}</h1>
                        <div className="detail_unit">
                            <button onClick={() => setUnit('metric')} className={`${unit === "metric" ? "active_unit" : ""}`}>°C</button><span>|</span>
                            <button onClick={() => setUnit('imperial')} className={`${unit === "imperial" ? "active_unit" : ""}`}>°F</button>
                        </div>
                    </div>

                    <div className="detail_verbose">
                        <p>Humidity {data.main.humidity}%</p>
                        <p>Wind: {data.wind.speed} {unit === "metric" ? "km/h" : "mph"}</p>
                    </div>
                </div>
            </div>
            <div className="detail_location">
                <h2>{location.name}, {location.country}</h2>
                <p>{moment(data.dt_txt, "YYYY-MM-DD hh:mm:ss").format("DD MMMM, dddd")}</p>
                <p>{data.weather[0].description}</p>
            </div>
        </div>
    )
}

export default Deatils;