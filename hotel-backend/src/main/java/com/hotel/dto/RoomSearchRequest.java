package com.hotel.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RoomSearchRequest {
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private String roomType;
    private Double minPrice;
    private Double maxPrice;
}
