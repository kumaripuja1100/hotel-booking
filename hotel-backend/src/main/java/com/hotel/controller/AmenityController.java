package com.hotel.controller;

import com.hotel.model.Amenity;
import com.hotel.repository.AmenityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/amenities")
@RequiredArgsConstructor
public class AmenityController {

    private final AmenityRepository amenityRepository;

    @GetMapping
    public ResponseEntity<List<Amenity>> getAllAmenities() {
        return ResponseEntity.ok(amenityRepository.findAll());
    }
}
