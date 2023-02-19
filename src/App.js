import React, { useState, useEffect } from "react";
// import First from "./components/First";
// import Second from "./components/Second";
// import Third from "./components/Third";
import "./App.css";

function App() {
  const URL =
    "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-EB1ADCDD-29A8-47B5-BEAC-91E9725AD56E";

  const [localArray, setLocalArray] = useState([]);
  const [local, setLocal] = useState(null);
  const [time, setTime] = useState(null);
  const [rain, setRain] = useState(null);
  const [temperatureHigh, setTemperatureHigh] = useState(null);
  const [temperatureLow, setTemperatureLow] = useState(null);
  const [index, setIndex] = useState(0);
  // 取得更換後的地區
  const changeLocal = () => {
    if (index > 21) {
      setIndex(0);
    } else {
      setLocal(localArray[index].locationName);
      setTemperatureHigh(
        localArray[index].weatherElement[4].time[1].parameter.parameterName
      );
      setTemperatureLow(
        localArray[index].weatherElement[2].time[1].parameter.parameterName
      );
      setRain(
        localArray[index].weatherElement[1].time[1].parameter.parameterName
      );
      setIndex(index + 1);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(URL);
      let Json = await response.json();
      let data = Json.records;
      // console.log(data);

      setLocalArray(data.location);
      setLocal(data.location[index].locationName);
      setTime(data.location[index].weatherElement[0].time[1].startTime);
      setRain(
        data.location[index].weatherElement[1].time[1].parameter.parameterName
      );
      setTemperatureHigh(
        data.location[index].weatherElement[4].time[1].parameter.parameterName
      );
      setTemperatureLow(
        data.location[index].weatherElement[2].time[1].parameter.parameterName
      );
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      <h1>簡易氣象預報</h1>
      <main>
        {/* <First />
        <Second />
        <Third /> */}
        <div>
          <h2>Start Time : {time}</h2>
          <h2>Local : {local}</h2>
          <h2>最高溫度 : {temperatureHigh} °C</h2>
          <h2>最低溫度 : {temperatureLow} °C</h2>
          <h2>降雨機率 : {rain} %</h2>
        </div>
      </main>
      <div className="center">
        <button onClick={changeLocal}>按我換地區</button>
      </div>
    </div>
  );
}

export default App;
