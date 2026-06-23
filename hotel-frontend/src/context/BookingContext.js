import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    selectedRoom: null,
    bookingId: null,
  });

  const updateBooking = (data) => setBookingData((prev) => ({ ...prev, ...data }));
  const clearBooking = () =>
    setBookingData({ checkIn: '', checkOut: '', guests: 1, selectedRoom: null, bookingId: null });

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
