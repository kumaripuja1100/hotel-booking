package com.hotel.repository;

import com.hotel.model.Room;
import com.hotel.model.enums.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByStatus(RoomStatus status);

    List<Room> findByType(String type);

    List<Room> findByCapacityGreaterThanEqual(Integer capacity);

    @Query("SELECT r FROM Room r WHERE r.status = 'AVAILABLE' AND r.capacity >= :guests AND r.id NOT IN " +
           "(SELECT b.room.id FROM Booking b WHERE b.status != 'CANCELLED' AND " +
           "((b.checkIn <= :checkOut AND b.checkOut >= :checkIn)))")
    List<Room> findAvailableRooms(
        @Param("checkIn") LocalDate checkIn,
        @Param("checkOut") LocalDate checkOut,
        @Param("guests") int guests
    );

    List<Room> findByPricePerNightBetween(Double min, Double max);
}
