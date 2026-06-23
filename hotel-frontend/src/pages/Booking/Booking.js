import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { getRoomById, createBooking } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { toast } from 'react-toastify';
import './Booking.css';

const Booking = () => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [checkIn, setCheckIn] = useState(bookingData.checkIn ? new Date(bookingData.checkIn) : null);
  const [checkOut, setCheckOut] = useState(bookingData.checkOut ? new Date(bookingData.checkOut) : null);
  const [adults, setAdults] = useState(bookingData.guests || 1);
  const [children, setChildren] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('');

  useEffect(() => {
    getRoomById(roomId)
      .then((res) => setRoom(res.data))
      .catch(() => navigate('/rooms'))
      .finally(() => setLoading(false));
  }, [roomId, navigate]);

  const nights = checkIn && checkOut
    ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
    : 0;

  const totalAmount = room ? room.pricePerNight * nights : 0;

  const fmt = (d) => d?.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights <= 0) {
      toast.error('Please select valid check-in and check-out dates');
      return;
    }
    setSubmitting(true);
    try {
      const res = await createBooking({
        roomId: +roomId,
        checkIn: fmt(checkIn),
        checkOut: fmt(checkOut),
        adults,
        children,
        specialRequests,
      });
      toast.success('Booking created! Proceed to payment.');
      navigate(`/payment/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="booking-loading">Loading...</div>;
  if (!room) return null;

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-header-overlay" />
        <div className="booking-header-content">
          <p className="section-pre">Step 1 of 2</p>
          <h1>Complete Your Booking</h1>
        </div>
      </div>

      <div className="booking-layout">
        {/* Form */}
        <div className="booking-form-section">
          <h2>Booking Details</h2>
          <div className="booking-divider" />

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="booking-guest-info">
              <h3>Guest Information</h3>
              <div className="guest-info-display">
                <div><strong>Name:</strong> {user?.name}</div>
                <div><strong>Email:</strong> {user?.email}</div>
              </div>
            </div>

            <div className="booking-dates">
              <h3>Stay Dates</h3>
              <div className="dates-grid">
                <div className="form-group">
                  <label>Check-in Date *</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={setCheckIn}
                    minDate={new Date()}
                    placeholderText="Select check-in"
                    dateFormat="MMMM dd, yyyy"
                    className="booking-date-input"
                  />
                </div>
                <div className="form-group">
                  <label>Check-out Date *</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={setCheckOut}
                    minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
                    placeholderText="Select check-out"
                    dateFormat="MMMM dd, yyyy"
                    className="booking-date-input"
                  />
                </div>
              </div>
            </div>

            <div className="booking-guests-section">
              <h3>Number of Guests</h3>
              <div className="guests-grid">
                <div className="form-group">
                  <label>Adults</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                    {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                    {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Special Requests</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requests or preferences? (e.g., high floor, non-smoking room, anniversary decoration)"
                rows={4}
                className="booking-textarea"
              />
            </div>

            <button type="submit" className="booking-submit" disabled={submitting}>
              {submitting ? 'Processing...' : 'Confirm Booking & Proceed to Payment →'}
            </button>
          </form>
        </div>

        {/* Summary */}
        <aside className="booking-summary">
          <h2>Booking Summary</h2>
          <div className="booking-divider" />

          <div className="summary-room">
            <img src={room.imageUrl} alt={room.name} className="summary-room-img" />
            <div className="summary-room-info">
              <span className="summary-type">{room.type}</span>
              <h3>{room.name}</h3>
              <p>Room {room.roomNumber} · Floor {room.floor}</p>
            </div>
          </div>

          <div className="summary-details">
            <div className="summary-row">
              <span>Check-in</span>
              <strong>{checkIn ? checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</strong>
            </div>
            <div className="summary-row">
              <span>Check-out</span>
              <strong>{checkOut ? checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</strong>
            </div>
            <div className="summary-row">
              <span>Guests</span>
              <strong>{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}</strong>
            </div>
            <div className="summary-row">
              <span>Duration</span>
              <strong>{nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}` : '—'}</strong>
            </div>
          </div>

          <div className="summary-price-breakdown">
            <div className="summary-row">
              <span>${room.pricePerNight} × {nights || 0} nights</span>
              <strong>${totalAmount.toFixed(2)}</strong>
            </div>
            <div className="summary-row tax">
              <span>Taxes & Fees (15%)</span>
              <strong>${(totalAmount * 0.15).toFixed(2)}</strong>
            </div>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <strong>${(totalAmount * 1.15).toFixed(2)}</strong>
          </div>

          <div className="summary-note">
            <p>✓ Free cancellation up to 24 hours before check-in</p>
            <p>✓ Best rate guarantee</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Booking;
