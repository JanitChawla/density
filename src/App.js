import "./App.css";
// import { useState } from "react";
import { Candle } from "./Candle";

function App() {
  //request api websocket
  // const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@kline_1m");

  // const [data, setData] = useState([]);
  // //console log result of websocket
  // ws.onmessage = function (event) {
  //   // console.log((event.data));
  //   var data = JSON.parse(event.data);
  //   console.log(data.k.t);
  //   setData(data.k.s);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <div>Hello</div>
        {/* {data} */}
        <Candle />
      </header>
    </div>
  );
}

export default App;
