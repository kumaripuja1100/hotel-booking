package com.hotel.service;

import com.hotel.dto.BookingRequest;
import com.hotel.model.Booking;
import com.hotel.model.Room;
import com.hotel.model.User;
import com.hotel.model.enums.BookingStatus;
import com.hotel.model.enums.RoomStatus;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.RoomRepository;
import com.hotel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public Booking createBooking(BookingRequest request, String email) {
        User guest = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getStatus() != RoomStatus.AVAILABLE) {
            throw new RuntimeException("Room is not available");
        }

        long nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        if (nights <= 0) throw new RuntimeException("Invalid date range");

        double total = room.getPricePerNight() * nights;

        Booking booking = Booking.builder()
                .guest(guest)
                .room(room)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .adults(request.getAdults() != null ? request.getAdults() : 1)
                .children(request.getChildren() != null ? request.getChildren() : 0)
                .totalAmount(total)
                .status(BookingStatus.PENDING)
                .specialRequests(request.getSpecialRequests())
                .build();

        room.setStatus(RoomStatus.BOOKED);
        roomRepository.save(room);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingRepository.findByGuest(user);
    }

    public Booking getBookingById(Long id, String email) {
        Booking booking = findById(id);
        if (!booking.getGuest().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        return booking;
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking cancelBooking(Long id, String email) {
        // getBookingById already verifies ownership
        Booking booking = getBookingById(id, email);
        booking.setStatus(BookingStatus.CANCELLED);
        booking.getRoom().setStatus(RoomStatus.AVAILABLE);
        roomRepository.save(booking.getRoom());
        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = findById(id);
        booking.setStatus(status);
        if (status == BookingStatus.COMPLETED || status == BookingStatus.CANCELLED) {
            booking.getRoom().setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(booking.getRoom());
        }
        return bookingRepository.save(booking);
    }

    private Booking findById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}
