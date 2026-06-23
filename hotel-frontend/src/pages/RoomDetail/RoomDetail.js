import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRoomById } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './RoomDetail.css';

const amenityIcons = {
  'Free WiFi': '📶', 'Swimming Pool': '🏊', 'Gym & Fitness': '💪',
  'Spa & Wellness': '💆', 'Restaurant': '🍽️', 'Bar & Lounge': '🍸',
  'Room Service': '🛎️', 'Air Conditioning': '❄️', 'Flat Screen TV': '📺',
  'Mini Bar': '🍾', 'Parking': '🚗', 'Airport Shuttle': '✈️',
};

const RoomDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoomById(id)
      .then((res) => setRoom(res.data))
      .catch(() => navigate('/rooms'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="detail-loading">Loading room details...</div>;
  if (!room) return null;

  const handleBook = () => {
    if (!user) navigate('/login');
    else navigate(`/booking/${room.id}`);
  };

  return (
    <div className="room-detail">
      {/* Hero */}
      <div className="detail-hero">
        <img src={room.imageUrl} alt={room.name} className="detail-hero-img" />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content">
          <span className="detail-type">{room.type}</span>
          <h1>{room.name}</h1>
          <div className="detail-meta">
            <span>👤 Up to {room.capacity} guests</span>
            {room.size && <span>📐 {room.size} m²</span>}
            {room.floor && <span>🏢 Floor {room.floor}</span>}
            <span>🛏️ Room {room.roomNumber}</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/rooms">Rooms</Link> / <span>{room.name}</span>
      </div>

      <div className="detail-layout">
        {/* Main Info */}
        <div className="detail-main">
          <section className="detail-section">
            <h2>About This Room</h2>
            <div className="detail-divider" />
            <p className="detail-desc">{room.description}</p>
          </section>

          {room.amenities && room.amenities.length > 0 && (
            <section className="detail-section">
              <h2>Room Amenities</h2>
              <div className="detail-divider" />
              <div className="detail-amenities">
                {room.amenities.map((a) => (
                  <div key={a.id} className="detail-amenity">
                    <span className="detail-amenity-icon">{amenityIcons[a.name] || '✨'}</span>
                    <div>
                      <strong>{a.name}</strong>
                      {a.description && <p>{a.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="detail-section">
            <h2>Hotel Policies</h2>
            <div className="detail-divider" />
            <div className="policies-grid">
              <div className="policy-item"><strong>Check-in</strong><span>From 3:00 PM</span></div>
              <div className="policy-item"><strong>Check-out</strong><span>Until 11:00 AM</span></div>
              <div className="policy-item"><strong>Cancellation</strong><span>Free up to 24h before arrival</span></div>
              <div className="policy-item"><strong>Payment</strong><span>Multiple options accepted</span></div>
              <div className="policy-item"><strong>Pets</strong><span>Not allowed</span></div>
              <div className="policy-item"><strong>Smoking</strong><span>Non-smoking room</span></div>
            </div>
          </section>
        </div>

        {/* Booking Card */}
        <aside className="detail-booking-card">
          <div className="booking-card-header">
            <div className="booking-card-price">
              <span className="booking-price-amount">${room.pricePerNight}</span>
              <span className="booking-price-per"> / night</span>
            </div>
            <span className={`room-status-badge ${room.status.toLowerCase()}`}>{room.status}</span>
          </div>

          <div className="booking-card-info">
            <div className="info-row"><span>Room Type</span><strong>{room.type}</strong></div>
            <div className="info-row"><span>Capacity</span><strong>{room.capacity} Guests</strong></div>
            {room.size && <div className="info-row"><span>Room Size</span><strong>{room.size} m²</strong></div>}
            {room.floor && <div className="info-row"><span>Floor</span><strong>{room.floor}</strong></div>}
          </div>

          {room.status === 'AVAILABLE' ? (
            <button className="btn-book-detail" onClick={handleBook}>
              Book This Room
            </button>
          ) : (
            <button className="btn-book-detail disabled" disabled>
              Currently Unavailable
            </button>
          )}

          <div className="booking-card-note">
            <p>✓ Free cancellation up to 24 hours before check-in</p>
            <p>✓ Best rate guarantee</p>
            <p>✓ No booking fees</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RoomDetail;
