-- Amenities
INSERT INTO amenities (name, icon, description) VALUES ('Free WiFi', 'wifi', 'High-speed wireless internet');
INSERT INTO amenities (name, icon, description) VALUES ('Swimming Pool', 'pool', 'Outdoor heated swimming pool');
INSERT INTO amenities (name, icon, description) VALUES ('Gym & Fitness', 'fitness_center', 'Fully equipped modern gym');
INSERT INTO amenities (name, icon, description) VALUES ('Spa & Wellness', 'spa', 'Luxury spa and wellness center');
INSERT INTO amenities (name, icon, description) VALUES ('Restaurant', 'restaurant', 'Fine dining restaurant');
INSERT INTO amenities (name, icon, description) VALUES ('Bar & Lounge', 'local_bar', 'Rooftop bar and lounge');
INSERT INTO amenities (name, icon, description) VALUES ('Room Service', 'room_service', '24/7 in-room dining service');
INSERT INTO amenities (name, icon, description) VALUES ('Air Conditioning', 'ac_unit', 'Central air conditioning');
INSERT INTO amenities (name, icon, description) VALUES ('Flat Screen TV', 'tv', '55-inch smart flat screen TV');
INSERT INTO amenities (name, icon, description) VALUES ('Mini Bar', 'local_drink', 'Complimentary mini bar');
INSERT INTO amenities (name, icon, description) VALUES ('Parking', 'local_parking', 'Free valet parking');
INSERT INTO amenities (name, icon, description) VALUES ('Airport Shuttle', 'airport_shuttle', 'Complimentary airport transfers');

-- Admin user (password: admin123)
INSERT INTO users (name, email, password, phone, role, created_at) VALUES
('Admin User', 'admin@grandluxe.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFekJMpKO.aOIiDaGJl3kUq', '+1-555-0100', 'ADMIN', NOW());

-- Demo guest (password: guest123)
INSERT INTO users (name, email, password, phone, role, created_at) VALUES
('Demo Guest', 'guest@grandluxe.com', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQsAmiz9lJOTLIlSALaQKf0hCsUYiK', '+1-555-0101', 'GUEST', NOW());

-- Rooms
INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('101', 'Classic Standard Room', 'STANDARD', 'Our Classic Standard Room offers comfortable accommodation with modern amenities. Featuring a plush queen bed, private bathroom, and garden views. Perfect for solo travelers and couples.', 99.00, 2, 1, 28.0, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('202', 'Deluxe City View Room', 'DELUXE', 'Experience elevated comfort in our Deluxe City View Room. Features a king-size bed, premium linens, marble bathroom with soaking tub, and stunning city panorama views.', 149.00, 2, 2, 38.0, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('305', 'Executive Business Room', 'EXECUTIVE', 'Designed for business travelers. Features a dedicated workspace, high-speed WiFi, premium coffee machine, and access to the exclusive executive lounge with complimentary breakfast.', 199.00, 2, 3, 42.0, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('410', 'Family Comfort Suite', 'FAMILY', 'Spacious Family Suite with two bedrooms, living area, and two bathrooms. Features bunk beds for kids, entertainment system, and family-sized amenities.', 179.00, 4, 4, 65.0, 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('501', 'Luxury Junior Suite', 'SUITE', 'Our Junior Suite offers a separate living area, king bed, luxury bath products, espresso machine, and spectacular panoramic views. Includes daily breakfast and evening cocktails.', 249.00, 2, 5, 72.0, 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop', '', 'BOOKED');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('601', 'Presidential Grand Suite', 'PRESIDENTIAL', 'The pinnacle of luxury. Our Presidential Suite features two floors with a private terrace, personal butler, grand piano, dining room for 8, and unparalleled city views.', 499.00, 4, 6, 180.0, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('103', 'Ocean View Standard', 'STANDARD', 'Wake up to breathtaking ocean views. Queen bed, private balcony, and direct ocean views. A serene retreat for beach lovers.', 119.00, 2, 1, 30.0, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop', '', 'AVAILABLE');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status) VALUES
('204', 'Deluxe Pool View Room', 'DELUXE', 'Overlooking our stunning infinity pool. King bed, spacious bathroom, private balcony with pool views, and premium in-room amenities.', 169.00, 2, 2, 40.0, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop', '', 'MAINTENANCE');

-- Link rooms to amenities (room_id, amenity_id)
-- Room 1 (Standard 101): WiFi, AC, TV, Room Service
INSERT INTO room_amenities (room_id, amenity_id) VALUES (1,1),(1,8),(1,9),(1,7);
-- Room 2 (Deluxe 202): WiFi, AC, TV, Mini Bar
INSERT INTO room_amenities (room_id, amenity_id) VALUES (2,1),(2,8),(2,9),(2,10);
-- Room 3 (Executive 305): WiFi, Restaurant, AC, TV
INSERT INTO room_amenities (room_id, amenity_id) VALUES (3,1),(3,5),(3,8),(3,9);
-- Room 4 (Family 410): WiFi, AC, TV, Room Service
INSERT INTO room_amenities (room_id, amenity_id) VALUES (4,1),(4,8),(4,9),(4,7);
-- Room 5 (Suite 501): WiFi, Pool, Spa, Mini Bar
INSERT INTO room_amenities (room_id, amenity_id) VALUES (5,1),(5,2),(5,4),(5,10);
-- Room 6 (Presidential 601): All amenities
INSERT INTO room_amenities (room_id, amenity_id) VALUES (6,1),(6,2),(6,3),(6,4),(6,5),(6,10),(6,11),(6,12);
-- Room 7 (Ocean 103): WiFi, AC, TV
INSERT INTO room_amenities (room_id, amenity_id) VALUES (7,1),(7,8),(7,9);
-- Room 8 (Pool 204): WiFi, Pool, AC, TV
INSERT INTO room_amenities (room_id, amenity_id) VALUES (8,1),(8,2),(8,8),(8,9);
