package com.hotel.service;

import com.hotel.model.Room;
import com.hotel.model.enums.RoomStatus;
import com.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found: " + id));
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByStatus(RoomStatus.AVAILABLE);
    }

    public List<Room> searchRooms(LocalDate checkIn, LocalDate checkOut, int guests) {
        return roomRepository.findAvailableRooms(checkIn, checkOut, guests);
    }

    public List<Room> getRoomsByType(String type) {
        return roomRepository.findByType(type);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(Long id, Room updatedRoom) {
        Room room = getRoomById(id);
        room.setName(updatedRoom.getName());
        room.setType(updatedRoom.getType());
        room.setDescription(updatedRoom.getDescription());
        room.setPricePerNight(updatedRoom.getPricePerNight());
        room.setCapacity(updatedRoom.getCapacity());
        room.setFloor(updatedRoom.getFloor());
        room.setSize(updatedRoom.getSize());
        room.setImageUrl(updatedRoom.getImageUrl());
        room.setStatus(updatedRoom.getStatus());
        room.setAmenities(updatedRoom.getAmenities());
        return roomRepository.save(room);
    }

    public void updateRoomStatus(Long id, RoomStatus status) {
        Room room = getRoomById(id);
        room.setStatus(status);
        roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
