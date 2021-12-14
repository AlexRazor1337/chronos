import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const axios = require('axios').default;

export default function Header(props) {
    const token = Cookies.get('token');
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('api/user').then(function (response) {
            setUser(response.data.user);
        }).catch(function (error) {
            return; // not logged in
        });
    }, [props.token]);

    if (user) {
        return (
        <header>
            <h2>Chronos</h2>
            <span>{user.name}</span>
        </header>)
    } else {
        return (
        <header>
            <h2>Chronos</h2>
            <span><a href="/login">Login</a></span>
        </header>)
    }

};
