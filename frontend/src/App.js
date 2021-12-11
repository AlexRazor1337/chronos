import Cookies from "js-cookie";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Login/Login";

const axios = require('axios');
axios.defaults.baseURL = "http://127.0.0.1:8000"
axios.interceptors.request.use(
    (config) => {
        if (Cookies.get('token'))
            config.headers.authorization = `Bearer ${Cookies.get('token')}`

        return config
    },
    (error) => Promise.reject(error)
)

export default function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            {/* <Registration /> */}
          </Route>
          <Route path="/">
            {/* <Home /> */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
