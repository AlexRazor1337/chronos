import React, { useEffect, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ExampleControlSlot from './ExampleControlSlot'
import { useHistory, Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
const axios = require('axios').default;

export default function MainCalendar(props) { // TODO add spinner, calendar selector
    const [calendarEvents, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const handleSelect = ({ start, end }) => {
        console.log("HALP", start.getTime() / 1000);
        const title = window.prompt('New Event name')
        if (title)
        axios.post('api/events', {date: start, name: title, calendar_id: props.match.params.id, duration: end.getTime() / 1000 - start.getTime() / 1000}).then(function (response) {
            setEvents([
                ...calendarEvents,
                {
                    start,
                    end,
                    title,
                },
            ])
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get('api/user').then(function (response) {
            axios.get('api/events/' + props.match.params.id).then(function (response) {
                setEvents(response.data.map((event) => {
                    console.log(new Date(event.date));
                    console.log(event.date);
                    return {
                        id: event.id,
                        title: event.name,
                        start: new Date(event.date),
                        end: new Date(new Date(event.date).getTime() + event.duration * 1000),
                        desc: event.category,
                      }
                }))
                setLoading(false);
            }).catch(function (error) {
                history.push('/');
            });
        }).catch(function (error) {
            history.push('/');
        });
    }, []);

    const localizer = momentLocalizer(moment)
    if (loading) {
        return (<div className="center">
            <ClipLoader color="blue" loading={loading} size={100} />
        </div>);
    } else {
        return (
            <>
                <Link to="/calendars">Back to calendars list</Link>
                <br />
                <br />
                <ExampleControlSlot.Entry waitForOutlet>
                    <strong>
                        Click an event to see more info, or drag the mouse over the calendar
                        to select a date/time range.
                    </strong>
                </ExampleControlSlot.Entry>
                <Calendar
                    MainCalendar
                    localizer={localizer}
                    events={calendarEvents}
                    defaultView={Views.WEEK}
                    scrollToTime={new Date(2000, 1, 1, 6)}
                    defaultDate={Date.now()}
                    onSelectEvent={event => alert(event.title + '\n' + event.desc.toUpperCase())}
                    onSelectSlot={handleSelect}
                    selectable
                />
            </>
        )
    }
    
};
