import Cookies from 'js-cookie'
import { useState } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';

const axios = require('axios').default;

export default function Login() {
    const token = Cookies.get('token');
    const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    let history = useHistory();
    
    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        axios.post('api/login', {email, password}).then(function (response) {
            console.log(response);
            Cookies.set('token', response.data.token, { expires: 1 })

            history.push('/');
        }).catch(function (error) {
            if (error?.response?.data?.message) {
                console.log("fail");
            }
        });
    }

    if (!isMyTokenExpired && decodedToken) {
        return (<>
            <Redirect to='/'/>;
        </>);
    } else {
        return (<>
            <form onSubmit={submit}>
                <h2>Login</h2>
                <input placeholder="E-mail" required type='text'
                    name="email"
                />
                <br/><br/>
                <input type="password" required
                    name="password"
                />
                <br/><br/>
                <button type="submit">Submit</button>
            </form>
        </>);
    }
};
