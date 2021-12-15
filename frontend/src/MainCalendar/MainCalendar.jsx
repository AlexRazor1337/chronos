import React, { useEffect, useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events'
import ExampleControlSlot from './ExampleControlSlot'

const axios = require('axios').default;

export default function MainCalendar(props) { // TODO add spinner, protect route, calendar selector
    const [calendarEvents, setEvents] = useState(events);
    const handleSelect = ({ start, end }) => {
        const title = window.prompt('New Event name')
        if (title)
        setEvents([
            ...calendarEvents,
            {
                start,
                end,
                title,
            },
        ])
    }

    useEffect(() => {
        axios.get('api/events/' + props.match.params.id).then(function (response) {
            setEvents(response.data.map((event) => {
                return {
                    id: event.id,
                    title: event.name,
                    start: new Date(event.date),
                    end: new Date(new Date(event.date).getTime() + event.duration * 1000),
                    desc: event.category,
                  }
            }))
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    const localizer = momentLocalizer(moment)
    return (
        <>
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
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={handleSelect}
            />
        </>
    )
};
