package com.hotel.controller;

import com.hotel.model.Booking;
import com.hotel.model.Payment;
import com.hotel.model.Room;
import com.hotel.model.User;
import com.hotel.model.enums.BookingStatus;
import com.hotel.model.enums.RoomStatus;
import com.hotel.repository.UserRepository;
import com.hotel.service.BookingService;
import com.hotel.service.PaymentService;
import com.hotel.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final RoomService roomService;
    private final BookingService bookingService;
    private final PaymentService paymentService;
    private final UserRepository userRepository;

    // ---- Rooms ----
    @GetMapping("/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @PostMapping("/rooms")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.createRoom(room));
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        return ResponseEntity.ok(roomService.updateRoom(id, room));
    }

    @PatchMapping("/rooms/{id}/status")
    public ResponseEntity<Void> updateRoomStatus(@PathVariable Long id, @RequestParam RoomStatus status) {
        roomService.updateRoomStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    // ---- Bookings ----
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PatchMapping("/bookings/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam BookingStatus status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }

    // ---- Payments ----
    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    // ---- Users ----
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
}
