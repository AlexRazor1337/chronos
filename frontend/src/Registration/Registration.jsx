import Cookies from 'js-cookie'
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';

const axios = require('axios').default;

export default function Registration(props) {
    const token = Cookies.get('token');
    const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    let history = useHistory();
    
    const submit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_confirmation = e.target.password.value;

        axios.post('api/register', {name, email, password, password_confirmation}).then(function (response) {
            Cookies.set('token', response.data.token, { expires: 1 })
            props.setToken(response.data.token)
            history.push('/');
            console.log("pushed");
        }).catch(function (error) {
            console.log(error);
        });
    }

    if (!isMyTokenExpired && decodedToken) {
        return <Redirect to='/'/>;
    } else {
        return (<div className="center">
            <form onSubmit={submit}>
                <h2>Login</h2>
                <input placeholder="Login" required type='text'
                    name="name"
                />
                <br/><br/>
                <input placeholder="E-mail" required type='text'
                    name="email"
                />
                <br/><br/>
                <input placeholder="Password" type="password" required
                    name="password"
                />
                <br/><br/>
                <input placeholder="Confirm password" type="password" required
                    name="password_confirmation"
                />
                <br/><br/>
                <div className="center">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>);
    }
};
