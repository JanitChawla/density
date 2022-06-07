import React from "react";
import { useState } from "react";
// import { Chart } from "react-google-charts";
import Chart, {
  CommonSeriesSettings,
  Series,
  Reduction,
  ArgumentAxis,
  Label,
  Format,
  ValueAxis,
  Title,
  Legend,
  Export,
  Tooltip,
} from "devextreme-react/chart";

// import { dataSource } from "./datasource";

export function Candle() {
  // const [Fdata, setData] = useState({
  //   time: 17,
  //   low: 20,
  //   open: 28,
  //   close: 38,
  //   high: 45,
  // });

  //arrays of objects is useState
  const [Fdata] = useState([
    {
      time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      l: 23.625,
      h: 25.125,
      o: 24.0,
      c: 24.875,
    },
  ]);

  //console log result of websocket

  function customizeTooltip(arg) {
    return {
      text: `Open: $${arg.openValue}<br/>
Close: $${arg.closeValue}<br/>
High: $${arg.highValue}<br/>
Low: $${arg.lowValue}<br/>`,
    };
  }

  const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

  ws.onopen = function (event) {
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      console.log(data.E);
      var unixTimestamp = data.E;
      var date = new Date(unixTimestamp);
      console.log(date.getHours());
    };

    // ws.close(1000, "closed");
  };

  // function chart() {
  //   ws.onmessage = function (event) {
  //     console.log(event.data);
  //     setData({
  //       ...Fdata,
  //       time: date.getHours() + ":" + date.getMinutes(),
  //       l: data.k.l,
  //       h: data.k.h,
  //       o: data.k.o,
  //       close: data.k.c,
  //     });
  //   };
  // }

  return (
    <Chart id="chart" title="Stock Price" dataSource={Fdata}>
      {/* <button onClick={chart}>Hello</button> */}
      <CommonSeriesSettings argumentField="time" type="candlestick" />
      <Series
        name="DELL"
        openValueField="o"
        highValueField="h"
        lowValueField="l"
        closeValueField="c"
      >
        <Reduction color="red" />
      </Series>
      <ArgumentAxis workdaysOnly={true}>
        <Label />
      </ArgumentAxis>
      <ValueAxis tickInterval={1}>
        <Title text="US dollars" />
        <Label>
          <Format precision={0} type="currency" />
        </Label>
      </ValueAxis>
      <Legend itemTextPosition="left" />
      <Export enabled={true} />
      <Tooltip
        enabled={true}
        location="edge"
        customizeTooltip={customizeTooltip}
      />
    </Chart>
  );
}
