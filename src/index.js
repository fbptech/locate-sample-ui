import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthProvider } from "./provider/AuthProvider";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["X-User-Agent"] = `${process.env.REACT_APP_NAME.toLowerCase().replaceAll(" ", "-")}-${process.env.REACT_APP_VERSION}`; // Header used in audit log

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
