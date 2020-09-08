import React from "react";
import ReactDOM from "react-dom";
import Chat from "./chat";

import "./index.css";

const App = () => (
  <div>
    <Chat></Chat>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
