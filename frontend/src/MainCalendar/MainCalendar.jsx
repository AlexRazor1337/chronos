import React, { useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './events'
import ExampleControlSlot from './ExampleControlSlot'

export default function MainCalendar(props) { // TODO add spinner, load events
    const [calendarEvents, setEvents] = useState(events)
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
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date(2015, 3, 12)}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={handleSelect}
            />
        </>
    )
};
