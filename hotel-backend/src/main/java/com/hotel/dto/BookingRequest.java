package com.hotel.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    @NotNull
    private Long roomId;

    @NotNull
    @FutureOrPresent(message = "Check-in date must be today or in the future")
    private LocalDate checkIn;

    @NotNull
    private LocalDate checkOut;

    @Min(value = 1, message = "At least 1 adult is required")
    @Max(value = 10, message = "Maximum 10 adults allowed")
    private Integer adults;

    @Min(value = 0, message = "Children count cannot be negative")
    @Max(value = 10, message = "Maximum 10 children allowed")
    private Integer children;

    @Size(max = 500, message = "Special requests cannot exceed 500 characters")
    private String specialRequests;
}
