import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
require("./utils/socketio");

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.unregister();
