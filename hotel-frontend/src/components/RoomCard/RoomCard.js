import React from 'react';
import { Link } from 'react-router-dom';
import './RoomCard.css';

const RoomCard = ({ room }) => {
  const statusClass = {
    AVAILABLE: 'badge-available',
    BOOKED: 'badge-booked',
    MAINTENANCE: 'badge-maintenance',
  }[room.status] || 'badge-available';

  return (
    <div className="room-card">
      <div className="room-card-img-wrap">
        <img src={room.imageUrl} alt={room.name} className="room-card-img" />
        <div className="room-card-type">{room.type}</div>
        <span className={`room-card-status ${statusClass}`}>{room.status}</span>
      </div>
      <div className="room-card-body">
        <div className="room-card-header">
          <h3 className="room-card-name">{room.name}</h3>
          <div className="room-card-price">
            <span className="price-amount">${room.pricePerNight}</span>
            <span className="price-night">/night</span>
          </div>
        </div>
        <p className="room-card-desc">{room.description?.substring(0, 100)}...</p>
        <div className="room-card-meta">
          <span>👤 {room.capacity} Guests</span>
          {room.size && <span>📐 {room.size} m²</span>}
          {room.floor && <span>🏢 Floor {room.floor}</span>}
        </div>
        {room.amenities && room.amenities.length > 0 && (
          <div className="room-card-amenities">
            {room.amenities.slice(0, 4).map((a) => (
              <span key={a.id} className="amenity-tag">{a.name}</span>
            ))}
            {room.amenities.length > 4 && (
              <span className="amenity-tag">+{room.amenities.length - 4} more</span>
            )}
          </div>
        )}
        <div className="room-card-actions">
          <Link to={`/rooms/${room.id}`} className="btn-details">View Details</Link>
          {room.status === 'AVAILABLE' && (
            <Link to={`/booking/${room.id}`} className="btn-book-room">Book Now</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
