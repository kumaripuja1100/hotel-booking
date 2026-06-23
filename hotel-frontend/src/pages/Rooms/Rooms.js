import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../../components/RoomCard/RoomCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getAllRooms, searchRooms } from '../../services/api';
import './Rooms.css';

const ROOM_TYPES = ['ALL', 'STANDARD', 'DELUXE', 'EXECUTIVE', 'FAMILY', 'SUITE', 'PRESIDENTIAL'];

const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('ALL');
  const [sortBy, setSortBy] = useState('price-asc');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const guests = searchParams.get('guests') || 1;

    const fetch = checkIn && checkOut
      ? searchRooms(checkIn, checkOut, guests)
      : getAllRooms();

    fetch
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const filtered = rooms
    .filter((r) => activeType === 'ALL' || r.type === activeType)
    .filter((r) => statusFilter === 'ALL' || r.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'capacity') return b.capacity - a.capacity;
      return 0;
    });

  return (
    <div className="rooms-page">
      {/* Page Header */}
      <div className="rooms-hero">
        <div className="rooms-hero-overlay" />
        <div className="rooms-hero-content">
          <p className="section-pre">Our Collection</p>
          <h1>Rooms & Suites</h1>
          <p>Discover your perfect sanctuary among our curated accommodations</p>
        </div>
      </div>

      {/* Search */}
      <div className="rooms-search-wrap">
        <SearchBar inline />
      </div>

      <div className="rooms-layout">
        {/* Sidebar */}
        <aside className="rooms-sidebar">
          <div className="filter-section">
            <h3>Room Type</h3>
            <div className="filter-list">
              {ROOM_TYPES.map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${activeType === type ? 'active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                  <span className="filter-count">
                    ({type === 'ALL' ? rooms.length : rooms.filter((r) => r.type === type).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Availability</h3>
            <div className="filter-list">
              {['ALL', 'AVAILABLE', 'BOOKED'].map((s) => (
                <button
                  key={s}
                  className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-range">
              <div className="price-bar">
                <div className="price-label">$99 — $499<span>/night</span></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="rooms-main">
          <div className="rooms-toolbar">
            <p className="rooms-count">
              {loading ? 'Loading...' : `${filtered.length} room${filtered.length !== 1 ? 's' : ''} found`}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="skeleton-card" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="no-rooms">
              <div className="no-rooms-icon">🏨</div>
              <h3>No rooms found</h3>
              <p>Try adjusting your filters or search dates</p>
            </div>
          ) : (
            <div className="rooms-results-grid">
              {filtered.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Rooms;
