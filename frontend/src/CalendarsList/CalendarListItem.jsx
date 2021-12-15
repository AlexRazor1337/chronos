import { Link } from 'react-router-dom';

const { contrastColor } = require('contrast-color');

export default function CalendarListItem(params) {
    return (<div className="calendarListItem" style={{backgroundColor: params.color}}>
        <Link to={"/calendar/" + params.id} style={{color: contrastColor({ bgColor: params.color})}}>{params.name}</Link>
        <p style={{color: contrastColor({ bgColor: params.color})}}>{params.description}</p>
    </div>)
};
