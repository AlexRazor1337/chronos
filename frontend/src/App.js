import Cookies from "js-cookie";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Footer from "./Misc/Footer";
import Header from "./Misc/Header";

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
  const [token, setToken] = useState(Cookies.get('token'));

  return (
    <div className="holy-grail">
      <Header token={token} setToken={setToken}/>
      <main className="holy-grail-body">
        <main className="holy-grail-content">
        <Router>
        <Switch>
            <Route path="/login">
              <Login setToken={setToken}/>
            </Route>
            <Route path="/register">
              <Registration setToken={setToken}/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
        </main>
      </main>
      <Footer/>
    </div>
  );
}
