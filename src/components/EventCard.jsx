import React from 'react';
import './EventCard.css';

function EventCard({ event, onClick }) {
  const { year, text } = event;

  return (
    <div className="event-card-small" onClick={onClick}>
      <span className="event-year">{year}</span>
      <p className="event-snippet">{text.slice(0, 80)}...</p>
    </div>
  );
}

export default EventCard;