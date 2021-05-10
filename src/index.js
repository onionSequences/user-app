import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App/App";

var firebaseConfig = {
  apiKey: "AIzaSyCMP9K29Uo2hGA6oFzeUH0lCDWvGG85Ihc",
  authDomain: "user-app-3b106.firebaseapp.com",
  projectId: "user-app-3b106",
  storageBucket: "user-app-3b106.appspot.com",
  messagingSenderId: "267437551711",
  appId: "1:267437551711:web:dbf0aa4bb35004dbe16bea",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
