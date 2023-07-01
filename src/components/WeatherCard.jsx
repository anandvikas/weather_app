import moment from "moment";
import { getCurrentAproximatedData, getDatesInAscending, weatherIcon } from "../utils/helper"
import { useState, useContext } from "react";
import { AppContext } from "../App";
import Chart from "./Chart";
import Deatils from "./Details";

const WeatherCard = () => {
    const { data } = useContext(AppContext);
    let datesInAscending = getDatesInAscending(data);
    let currentAproxData = getCurrentAproximatedData(data);
    const [selecedDay, setSelectedDay] = useState(datesInAscending[0]);
    return (
        <div className="weathher_card">
            <Deatils data={currentAproxData[selecedDay][0]} />
            <Chart data={data[selecedDay]} />
            <div className="day_map">
                {
                    datesInAscending.map((val) => {
                        let dayData = currentAproxData[val][0]

                        return (
                            <div className="dd_card" key={dayData.dt} onClick={() => setSelectedDay(val)}>
                                <h2 className="dd_day">{moment(dayData.dt_txt, "YYYY-MM-DD hh:mm:ss").format("ddd")}</h2>
                                <img className="dd_img" src={`image/${weatherIcon[dayData.weather[0].main]}`} alt="" />
                                <p className="dd_temp"><span className="dd_temp_max">{Math.round(dayData.main.temp_max)}°</span>  <span className="dd_temp_min">{Math.round(dayData.main.temp_min)}°</span></p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WeatherCard;

