import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyBookings, cancelBooking } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './GuestDashboard.css';

const statusColors = {
  PENDING: '#f59e0b',
  CONFIRMED: '#10b981',
  CANCELLED: '#ef4444',
  COMPLETED: '#6366f1',
};

const GuestDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ALL');

  const fetchBookings = () => {
    getMyBookings()
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch {
      toast.error('Failed to cancel booking');
    }
  };

  const filtered = activeTab === 'ALL'
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    spent: bookings.filter((b) => b.status !== 'CANCELLED').reduce((s, b) => s + b.totalAmount, 0),
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-header-overlay" />
        <div className="dashboard-header-content">
          <p className="section-pre">My Account</p>
          <h1>Welcome back, {user?.name?.split(' ')[0]}</h1>
          <p>Manage your reservations and preferences</p>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <span className="guest-badge">GUEST MEMBER</span>
          </div>
          <button className="btn-new-booking" onClick={() => navigate('/rooms')}>
            + New Booking
          </button>
        </div>

        {/* Stats */}
        <div className="dashboard-stats">
          <div className="dash-stat">
            <span className="dash-stat-num">{stats.total}</span>
            <span className="dash-stat-label">Total Bookings</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">{stats.confirmed}</span>
            <span className="dash-stat-label">Confirmed</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">{stats.pending}</span>
            <span className="dash-stat-label">Pending</span>
          </div>
          <div className="dash-stat">
            <span className="dash-stat-num">${stats.spent.toFixed(0)}</span>
            <span className="dash-stat-label">Total Spent</span>
          </div>
        </div>

        {/* Bookings */}
        <div className="bookings-section">
          <div className="bookings-section-header">
            <h2>My Reservations</h2>
            <div className="booking-tabs">
              {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="bookings-loading">Loading your reservations...</div>
          ) : filtered.length === 0 ? (
            <div className="no-bookings">
              <div className="no-bookings-icon">🏨</div>
              <h3>No {activeTab.toLowerCase()} bookings</h3>
              <p>Ready for your next getaway?</p>
              <button onClick={() => navigate('/rooms')} className="btn-explore">
                Explore Rooms
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {filtered.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-card-img-wrap">
                    {booking.room?.imageUrl && (
                      <img src={booking.room.imageUrl} alt={booking.room.name} />
                    )}
                  </div>
                  <div className="booking-card-details">
                    <div className="booking-card-top">
                      <div>
                        <span className="booking-room-type">{booking.room?.type}</span>
                        <h3>{booking.room?.name || 'Room'}</h3>
                        <p className="booking-room-num">Room {booking.room?.roomNumber}</p>
                      </div>
                      <span
                        className="booking-status"
                        style={{ color: statusColors[booking.status], borderColor: statusColors[booking.status] }}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-card-info-row">
                      <div className="booking-info-item">
                        <label>Check-in</label>
                        <strong>{booking.checkIn}</strong>
                      </div>
                      <div className="booking-info-item">
                        <label>Check-out</label>
                        <strong>{booking.checkOut}</strong>
                      </div>
                      <div className="booking-info-item">
                        <label>Guests</label>
                        <strong>{booking.adults}A, {booking.children}C</strong>
                      </div>
                      <div className="booking-info-item">
                        <label>Total</label>
                        <strong className="booking-total">${booking.totalAmount?.toFixed(2)}</strong>
                      </div>
                    </div>
                    {booking.specialRequests && (
                      <p className="booking-special">📋 {booking.specialRequests}</p>
                    )}
                    <div className="booking-card-actions">
                      {booking.status === 'PENDING' && (
                        <>
                          <button
                            className="btn-pay-now"
                            onClick={() => navigate(`/payment/${booking.id}`)}
                          >
                            Pay Now
                          </button>
                          <button
                            className="btn-cancel-booking"
                            onClick={() => handleCancel(booking.id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button
                          className="btn-cancel-booking"
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
