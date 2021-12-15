import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import CalendarListItem from './CalendarListItem';
const axios = require('axios').default;

export default function CalendarsList(params) {
    const [calendarsList, setCalendars] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get('api/user').then(function (response) {
            axios.get('api/calendars').then(function (response) {
                setCalendars(response.data)
                setLoading(false)
            }).catch(function (error) {
                history.push('/');
            });
        }).catch(function (error) {
            history.push('/');
        });
    }, []);

    if (loading) {
        return (<div className="center">
            <ClipLoader color="blue" loading={loading} size={150} />
        </div>);
    } else {
        return (<>
            {calendarsList.map((calendar)=> <CalendarListItem {...calendar}/>)}
        </>);
    }
};
