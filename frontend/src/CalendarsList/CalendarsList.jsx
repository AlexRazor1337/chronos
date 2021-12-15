import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import CalendarListItem from './CalendarListItem';
const axios = require('axios').default;

export default function CalendarsList(params) {
    const [calendarsList, setCalendars] = useState([]);
    const [isCreateShowing, showCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const loadCalendars = () => {
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
    }

    useEffect(() => {
        loadCalendars();
    }, []);

    const createCalendar = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const color = e.target.color.value;

        axios.post('api/calendars', {name, description, color}).then(function (response) {
            setLoading(true);
            showCreate(false);
            loadCalendars();
        }).catch(function (error) {
            console.log(error);
        });
    }

    if (loading) {
        return (<div className="center">
            <ClipLoader color="blue" loading={loading} size={150} />
        </div>);
    } else {
        if (isCreateShowing) {
            return (<>
                {calendarsList.map((calendar)=> <CalendarListItem {...calendar}/>).concat([
                    <div className="calendarListItem" id="createNew">
                        <div className="center"><p onClick={()=>showCreate(false)}>Create new</p></div>
                        <form onSubmit={createCalendar}>
                            <br />
                            <div className="center"><input type="text" placeholder="Name" name="name"/></div>
                            <div className="center"><input type="text" placeholder="Description" name="description"/></div>
                            <div className="center">Pick a color</div>
                            <div className="center"><input type="color" name="color"/></div>
                            <div className="center"><button type="submit">Create</button></div>
                        </form>
                    </div>])
                }
            </>);
        } else {
            return (<>
                {calendarsList.map((calendar)=> <CalendarListItem {...calendar}/>).concat([
                    <div className="calendarListItem" id="createNew" onClick={()=>showCreate(true)}>
                        <div className="center"><p>Create new</p></div>
                    </div>])
                }
            </>);
        }
    }
};
