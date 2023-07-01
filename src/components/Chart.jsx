import moment from "moment";
import {
    AreaChart,
    Area,
    XAxis,
} from "recharts";
import { useState } from "react";

const Chart = ({ data }) => {
    const [tab, setTab] = useState("temp");
    return (
        <>
            <div className="tabs_container">
                <div className="tabs">
                    <button className={`tab_btn ${tab === "temp" ? "active_tab" : ""}`} onClick={() => setTab("temp")}>Temperature</button> <span>|</span>
                    <button className={`tab_btn ${tab === "wind" ? "active_tab" : ""}`} onClick={() => setTab("wind")}>Wind</button>
                </div>
                <div></div>
            </div>
            {tab === "temp" ? <TempChart data={data} /> : <WindChart data={data} />}
        </>
    )
}

const TempChart = ({ data }) => {
    let chartData = data.map((val) => {
        return {
            name: moment(val.dt_txt, "YYYY-MM-DD hh:mm:ss").format("h a"),
            temp: Math.round(val.main.temp)
        }
    })
    return (
        <div className="time_map">
            <AreaChart
                width={700}
                height={200}
                data={chartData}
                margin={{
                    top: 50,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis dataKey="name" />
                <Area type="monotone" dataKey="temp" stroke="#e7c749" fill="#49422b" label={<CustomBarLabel />} strokeWidth={2} />
            </AreaChart>
        </div>
    )
}

const WindChart = ({ data }) => {
    let chartData = data.map((val) => {
        return {
            name: moment(val.dt_txt, "YYYY-MM-DD hh:mm:ss").format("h a"),
            temp: val.wind.speed
        }
    })
    return (
        <div className="time_map">
            <AreaChart
                width={700}
                height={200}
                data={chartData}
                margin={{
                    top: 50,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis dataKey="name" />
                <Area type="monotone" dataKey="temp" stroke="#2196f3" fill="#1f8adf99" label={<CustomBarLabel />} strokeWidth={2} />
            </AreaChart>
        </div>
    )
}

const CustomBarLabel = ({ x, y, value }) => {
    return (<g transform={`translate(${x},${y})`}>
        <text x={0} y={-30} dy={16} fill="#666" transform="rotate(0)">
            {value}
        </text>
    </g>);
};

export default Chart;