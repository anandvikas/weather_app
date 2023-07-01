import moment from "moment";

export const APIKEY = "5ae7179e837ec2f5ff23a2b55cec7b69"

// For icons
export const weatherIcon = {
    "Thunderstorm": "Thunderstorm.png",
    "Drizzle": "Drizzle.png",
    "Rain": "Rain.png",
    "Snow": "Snow.png",
    "Mist": "Fog.png",
    "Smoke": "Fog.png",
    "Haze": "Fog.png",
    "Dust": "Fog.png",
    "Fog": "Fog.png",
    "Sand": "Fog.png",
    "Ash": "Fog.png",
    "Squall": "Fog.png",
    "Tornado": "Fog.png",
    "Clear": "Clear.png",
    "Clouds": "Clouds.png"
}

// This will filter out the time based data, which is not relevent ---
export const getCurrentAproximatedData = (data) => {
    let currentDate = moment().format("YYYY-MM-DD");
    let currentAproxTime = data[currentDate][0].dt_txt.split(" ")[1];
    let currentAproxData = JSON.parse(JSON.stringify(data));
    for (let key in currentAproxData) {
        currentAproxData[key] = currentAproxData[key].filter(elem => (elem.dt_txt.split(" ")[1] === currentAproxTime));
        if (currentAproxData[key].length <= 0) {
            currentAproxData[key] = [data[key][data[key].length - 1]]
        }
    }
    return currentAproxData;
}

// Dates may get organised in object in random order, this will get the sorted dates.
export const getDatesInAscending = (data) => {
    let dates = [];
    for (let key in data) {
        dates.push(key)
    }
    let datesInAscendingOrder = dates.sort((a, b) => { return moment(a, "YYYY-MM-DD").format("YYYYMMDD") - moment(b, "YYYY-MM-DD").format("YYYYMMDD") })
    return datesInAscendingOrder;
}