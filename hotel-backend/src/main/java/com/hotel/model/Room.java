package com.hotel.model;

import com.hotel.model.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "rooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String roomNumber;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double pricePerNight;

    @Column(nullable = false)
    private Integer capacity;

    private Integer floor;

    private Double size;

    private String imageUrl;

    private String extraImages;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "room_amenities",
        joinColumns = @JoinColumn(name = "room_id"),
        inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private List<Amenity> amenities;
}
