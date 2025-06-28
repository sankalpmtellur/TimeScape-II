// pages/History.jsx
import React, { useEffect, useState } from 'react';
import '../App.css';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function History() {
  const today = new Date();
  const storedMonth = localStorage.getItem('selectedMonth');
  const storedDay = localStorage.getItem('selectedDay');

  const [month, setMonth] = useState(
    storedMonth ? Number(storedMonth) : today.getMonth() + 1
  );
  const [day, setDay] = useState(
    storedDay ? Number(storedDay) : today.getDate()
  );

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`
        );
        const data = await res.json();
        setEvents(data.events);
      } catch (err) {
        console.error("Fetch error:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [month, day]);

  const handleMonthChange = (e) => {
    const selected = Number(e.target.value);
    setMonth(selected);
    localStorage.setItem('selectedMonth', selected);
  };

  const handleDayChange = (e) => {
    const selected = Number(e.target.value);
    setDay(selected);
    localStorage.setItem('selectedDay', selected);
  };

  return (
    <div className="app">
      <header>
        <h1>📜 This Day in History</h1>
        <div className="date-selectors">
          <select value={month} onChange={handleMonthChange}>
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select value={day} onChange={handleDayChange}>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <p>Showing events for <strong>{months[month - 1]} {day}</strong></p>
      </header>

      {loading ? (
        <p className="loading">Loading events...</p>
      ) : (
        <div className="event-list-grid">
          {events.map((event, index) => (
            <EventCard key={index} event={event} onClick={() => setSelectedEvent(event)} />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}

export default History;