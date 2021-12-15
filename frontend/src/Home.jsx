import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const axios = require('axios').default;

export default function Home() {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        axios.get('api/user').then(function (response) {
            setUser(response.data.user);
        }).catch(function (error) {
            console.log(error);
            return; // not logged in
        });
    }, []);

    if (user) {
        return (<>
            <div className="center">
                <h2>Welcome to the Chronos app. Start managing your time now!</h2>                
            </div>
            <br />
            <div className="center">
                <button onClick={()=>history.push('/calendars')}>Go to my calendars</button>
            </div>
        </>);
    } else {
        return (<>
            <div className="center">
                <h2>Welcome to the Chronos app. Start managing your time now!</h2>
            </div>
            <br />
            <div className="center">
                <button onClick={()=>history.push('/register')}>Start now</button>
            </div>
        </>);
    }
};
