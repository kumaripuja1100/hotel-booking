import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { toast } from 'react-toastify';
import './SearchBar.css';

const SearchBar = ({ inline = false }) => {
  const { updateBooking } = useBooking();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (checkOut <= checkIn) {
      toast.error('Check-out must be after check-in');
      return;
    }
    const fmt = (d) => d.toISOString().split('T')[0];
    updateBooking({ checkIn: fmt(checkIn), checkOut: fmt(checkOut), guests });
    navigate(`/rooms?checkIn=${fmt(checkIn)}&checkOut=${fmt(checkOut)}&guests=${guests}`);
  };

  const minCheckOut = checkIn ? new Date(checkIn.getTime() + 86400000) : new Date();

  return (
    <div className={`search-bar ${inline ? 'inline' : ''}`}>
      <div className="search-group">
        <label>CHECK-IN</label>
        <DatePicker
          selected={checkIn}
          onChange={setCheckIn}
          minDate={new Date()}
          placeholderText="Select date"
          dateFormat="MMM dd, yyyy"
          className="search-input"
        />
      </div>
      <div className="search-divider" />
      <div className="search-group">
        <label>CHECK-OUT</label>
        <DatePicker
          selected={checkOut}
          onChange={setCheckOut}
          minDate={minCheckOut}
          placeholderText="Select date"
          dateFormat="MMM dd, yyyy"
          className="search-input"
        />
      </div>
      <div className="search-divider" />
      <div className="search-group">
        <label>GUESTS</label>
        <select value={guests} onChange={(e) => setGuests(+e.target.value)} className="search-input">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
          ))}
        </select>
      </div>
      <button className="search-btn" onClick={handleSearch}>
        Search Rooms
      </button>
    </div>
  );
};

export default SearchBar;
