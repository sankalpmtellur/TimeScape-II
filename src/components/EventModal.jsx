import React from 'react';
import './EventModal.css';

function EventModal({ event, onClose }) {
  const { year, text, pages } = event;
  const image = pages?.[0]?.thumbnail?.source;
  const link = pages?.[0]?.content_urls?.desktop?.page;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {image && <img src={image} alt="event" className="modal-image" />}
        <h2>{year}</h2>
        <p>{text}</p>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="modal-link">
            Read more on Wikipedia ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default EventModal;