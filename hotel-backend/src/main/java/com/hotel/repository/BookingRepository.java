package com.hotel.repository;

import com.hotel.model.Booking;
import com.hotel.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByGuest(User guest);
    List<Booking> findByGuestId(Long guestId);
    List<Booking> findByRoomId(Long roomId);
}
