import React, { useEffect, useState } from 'react';
import {
  adminGetAllRooms, adminGetAllBookings, adminGetAllPayments, adminGetAllUsers,
  adminDeleteRoom, adminUpdateRoomStatus, adminUpdateBookingStatus, adminCreateRoom
} from '../../services/api';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const TABS = ['Overview', 'Rooms', 'Bookings', 'Payments', 'Guests'];

const EMPTY_ROOM = {
  roomNumber: '', name: '', type: 'STANDARD', description: '',
  pricePerNight: '', capacity: 2, floor: 1, size: '', imageUrl: '', status: 'AVAILABLE',
};

const AdminDashboard = () => {
  const [tab, setTab] = useState('Overview');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [roomForm, setRoomForm] = useState(EMPTY_ROOM);
  const [submittingRoom, setSubmittingRoom] = useState(false);

  useEffect(() => {
    Promise.all([
      adminGetAllRooms(),
      adminGetAllBookings(),
      adminGetAllPayments(),
      adminGetAllUsers(),
    ])
      .then(([r, b, p, u]) => {
        setRooms(r.data);
        setBookings(b.data);
        setPayments(p.data);
        setUsers(u.data);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await adminDeleteRoom(id);
      setRooms((prev) => prev.filter((r) => r.id !== id));
      toast.success('Room deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleRoomStatusChange = async (id, status) => {
    try {
      await adminUpdateRoomStatus(id, status);
      setRooms((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
      toast.success('Status updated');
    } catch { toast.error('Failed to update status'); }
  };

  const handleBookingStatusChange = async (id, status) => {
    try {
      await adminUpdateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      toast.success('Booking status updated');
    } catch { toast.error('Failed to update'); }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setSubmittingRoom(true);
    try {
      const res = await adminCreateRoom({ ...roomForm, pricePerNight: +roomForm.pricePerNight, capacity: +roomForm.capacity, floor: +roomForm.floor, size: +roomForm.size });
      setRooms((prev) => [...prev, res.data]);
      setShowRoomForm(false);
      setRoomForm(EMPTY_ROOM);
      toast.success('Room created successfully');
    } catch { toast.error('Failed to create room'); }
    finally { setSubmittingRoom(false); }
  };

  const stats = {
    totalRooms: rooms.length,
    available: rooms.filter((r) => r.status === 'AVAILABLE').length,
    booked: rooms.filter((r) => r.status === 'BOOKED').length,
    totalBookings: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    revenue: payments.filter((p) => p.status === 'SUCCESS').reduce((s, p) => s + p.amount, 0),
    totalGuests: users.filter((u) => u.role === 'GUEST').length,
  };

  if (loading) return <div className="admin-loading">Loading admin panel...</div>;

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-logo">GRAND LUXE</span>
          <p>Admin Portal</p>
        </div>
        <nav className="admin-nav">
          {TABS.map((t) => (
            <button
              key={t}
              className={`admin-nav-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'Overview' && '📊 '}
              {t === 'Rooms' && '🏨 '}
              {t === 'Bookings' && '📋 '}
              {t === 'Payments' && '💳 '}
              {t === 'Guests' && '👥 '}
              {t}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-top-bar">
          <h1>{tab}</h1>
          {tab === 'Rooms' && (
            <button className="btn-add-room" onClick={() => setShowRoomForm(true)}>
              + Add New Room
            </button>
          )}
        </div>

        {/* Overview */}
        {tab === 'Overview' && (
          <div className="admin-overview">
            <div className="admin-stats-grid">
              {[
                { label: 'Total Rooms', value: stats.totalRooms, icon: '🏨', color: '#6366f1' },
                { label: 'Available', value: stats.available, icon: '✅', color: '#10b981' },
                { label: 'Booked', value: stats.booked, icon: '🔒', color: '#f59e0b' },
                { label: 'Total Bookings', value: stats.totalBookings, icon: '📋', color: '#3b82f6' },
                { label: 'Confirmed', value: stats.confirmed, icon: '✓', color: '#10b981' },
                { label: 'Total Revenue', value: `$${stats.revenue.toFixed(0)}`, icon: '💰', color: '#c9a84c' },
                { label: 'Total Guests', value: stats.totalGuests, icon: '👥', color: '#8b5cf6' },
              ].map((s) => (
                <div key={s.label} className="admin-stat-card" style={{ borderTopColor: s.color }}>
                  <span className="admin-stat-icon">{s.icon}</span>
                  <span className="admin-stat-val">{s.value}</span>
                  <span className="admin-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="admin-recent">
              <h2>Recent Bookings</h2>
              <table className="admin-table">
                <thead>
                  <tr><th>#</th><th>Guest</th><th>Room</th><th>Check-in</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {bookings.slice(0, 5).map((b) => (
                    <tr key={b.id}>
                      <td>#{b.id}</td>
                      <td>{b.guest?.name}</td>
                      <td>{b.room?.name}</td>
                      <td>{b.checkIn}</td>
                      <td>${b.totalAmount?.toFixed(2)}</td>
                      <td><span className={`admin-status-badge ${b.status?.toLowerCase()}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rooms */}
        {tab === 'Rooms' && (
          <>
            {showRoomForm && (
              <div className="room-form-overlay">
                <div className="room-form-modal">
                  <div className="modal-header">
                    <h2>Add New Room</h2>
                    <button className="modal-close" onClick={() => setShowRoomForm(false)}>✕</button>
                  </div>
                  <form onSubmit={handleCreateRoom} className="room-form">
                    <div className="form-2col">
                      <div className="form-group"><label>Room Number *</label><input required value={roomForm.roomNumber} onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })} placeholder="101" /></div>
                      <div className="form-group"><label>Room Name *</label><input required value={roomForm.name} onChange={(e) => setRoomForm({ ...roomForm, name: e.target.value })} placeholder="Classic Standard Room" /></div>
                    </div>
                    <div className="form-2col">
                      <div className="form-group">
                        <label>Type *</label>
                        <select value={roomForm.type} onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })}>
                          {['STANDARD', 'DELUXE', 'EXECUTIVE', 'FAMILY', 'SUITE', 'PRESIDENTIAL'].map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <select value={roomForm.status} onChange={(e) => setRoomForm({ ...roomForm, status: e.target.value })}>
                          {['AVAILABLE', 'BOOKED', 'MAINTENANCE'].map((s) => <option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label>Description</label><textarea rows={3} value={roomForm.description} onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })} placeholder="Room description..." /></div>
                    <div className="form-group"><label>Image URL *</label><input required type="url" value={roomForm.imageUrl} onChange={(e) => setRoomForm({ ...roomForm, imageUrl: e.target.value })} placeholder="https://..." /></div>
                    <div className="form-3col">
                      <div className="form-group"><label>Price/Night ($) *</label><input required type="number" value={roomForm.pricePerNight} onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })} placeholder="99" /></div>
                      <div className="form-group"><label>Capacity</label><input type="number" value={roomForm.capacity} onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })} /></div>
                      <div className="form-group"><label>Floor</label><input type="number" value={roomForm.floor} onChange={(e) => setRoomForm({ ...roomForm, floor: e.target.value })} /></div>
                    </div>
                    <div className="form-group"><label>Size (m²)</label><input type="number" value={roomForm.size} onChange={(e) => setRoomForm({ ...roomForm, size: e.target.value })} placeholder="35" /></div>
                    <div className="form-actions">
                      <button type="button" onClick={() => setShowRoomForm(false)} className="btn-cancel-form">Cancel</button>
                      <button type="submit" className="btn-save-room" disabled={submittingRoom}>
                        {submittingRoom ? 'Saving...' : 'Create Room'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="admin-rooms-grid">
              {rooms.map((room) => (
                <div key={room.id} className="admin-room-card">
                  <img src={room.imageUrl} alt={room.name} className="admin-room-img" />
                  <div className="admin-room-body">
                    <div className="admin-room-header">
                      <div>
                        <span className="admin-room-type">{room.type}</span>
                        <h3>{room.name}</h3>
                        <p>Room {room.roomNumber} · Floor {room.floor}</p>
                      </div>
                      <strong className="admin-room-price">${room.pricePerNight}/night</strong>
                    </div>
                    <div className="admin-room-controls">
                      <select
                        value={room.status}
                        onChange={(e) => handleRoomStatusChange(room.id, e.target.value)}
                        className={`admin-status-select ${room.status?.toLowerCase()}`}
                      >
                        {['AVAILABLE', 'BOOKED', 'MAINTENANCE'].map((s) => <option key={s}>{s}</option>)}
                      </select>
                      <button className="btn-delete-room" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Bookings */}
        {tab === 'Bookings' && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Guest</th><th>Room</th><th>Check-in</th><th>Check-out</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td><strong>{b.guest?.name}</strong><br /><small>{b.guest?.email}</small></td>
                    <td>{b.room?.name}</td>
                    <td>{b.checkIn}</td>
                    <td>{b.checkOut}</td>
                    <td><strong>${b.totalAmount?.toFixed(2)}</strong></td>
                    <td><span className={`admin-status-badge ${b.status?.toLowerCase()}`}>{b.status}</span></td>
                    <td>
                      <select
                        className="admin-action-select"
                        value={b.status}
                        onChange={(e) => handleBookingStatusChange(b.id, e.target.value)}
                      >
                        {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Payments */}
        {tab === 'Payments' && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Booking</th><th>Amount</th><th>Method</th><th>Transaction ID</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>#{p.id}</td>
                    <td>Booking #{p.booking?.id}</td>
                    <td><strong>${p.amount?.toFixed(2)}</strong></td>
                    <td>{p.method?.replace('_', ' ')}</td>
                    <td><code>{p.transactionId}</code></td>
                    <td>{p.paymentDate?.substring(0, 10)}</td>
                    <td><span className={`admin-status-badge ${p.status?.toLowerCase()}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Guests */}
        {tab === 'Guests' && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td><strong>{u.name}</strong></td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td><span className={`admin-status-badge ${u.role?.toLowerCase()}`}>{u.role}</span></td>
                    <td>{u.createdAt?.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
