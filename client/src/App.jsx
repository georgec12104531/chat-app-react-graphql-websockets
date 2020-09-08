import React from "react";
import ReactDOM from "react-dom";
import Chat from "./chat";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import "./index.css";

const App = () => (
  <div>
    <Chat></Chat>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
