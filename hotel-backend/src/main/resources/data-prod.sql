-- Amenities
INSERT INTO amenities (name, icon, description) SELECT 'Free WiFi','wifi','High-speed wireless internet' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Free WiFi');
INSERT INTO amenities (name, icon, description) SELECT 'Swimming Pool','pool','Outdoor heated swimming pool' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Swimming Pool');
INSERT INTO amenities (name, icon, description) SELECT 'Gym & Fitness','fitness_center','Fully equipped modern gym' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Gym & Fitness');
INSERT INTO amenities (name, icon, description) SELECT 'Spa & Wellness','spa','Luxury spa and wellness center' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Spa & Wellness');
INSERT INTO amenities (name, icon, description) SELECT 'Restaurant','restaurant','Fine dining restaurant' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Restaurant');
INSERT INTO amenities (name, icon, description) SELECT 'Bar & Lounge','local_bar','Rooftop bar and lounge' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Bar & Lounge');
INSERT INTO amenities (name, icon, description) SELECT 'Room Service','room_service','24/7 in-room dining service' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Room Service');
INSERT INTO amenities (name, icon, description) SELECT 'Air Conditioning','ac_unit','Central air conditioning' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Air Conditioning');
INSERT INTO amenities (name, icon, description) SELECT 'Flat Screen TV','tv','55-inch smart flat screen TV' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Flat Screen TV');
INSERT INTO amenities (name, icon, description) SELECT 'Mini Bar','local_drink','Complimentary mini bar' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Mini Bar');
INSERT INTO amenities (name, icon, description) SELECT 'Parking','local_parking','Free valet parking' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Parking');
INSERT INTO amenities (name, icon, description) SELECT 'Airport Shuttle','airport_shuttle','Complimentary airport transfers' WHERE NOT EXISTS (SELECT 1 FROM amenities WHERE name='Airport Shuttle');

-- Users
INSERT INTO users (name, email, password, phone, role, created_at)
SELECT 'Admin User','admin@grandluxe.com','$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iYqiSfFekJMpKO.aOIiDaGJl3kUq','+1-555-0100','ADMIN',NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='admin@grandluxe.com');

INSERT INTO users (name, email, password, phone, role, created_at)
SELECT 'Demo Guest','guest@grandluxe.com','$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQsAmiz9lJOTLIlSALaQKf0hCsUYiK','+1-555-0101','GUEST',NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email='guest@grandluxe.com');

-- Rooms
INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '101','Classic Standard Room','STANDARD','Our Classic Standard Room offers comfortable accommodation with modern amenities. Featuring a plush queen bed, private bathroom, and garden views. Perfect for solo travelers and couples.',99.00,2,1,28.0,'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='101');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '202','Deluxe City View Room','DELUXE','Experience elevated comfort in our Deluxe City View Room. Features a king-size bed, premium linens, marble bathroom with soaking tub, and stunning city panorama views.',149.00,2,2,38.0,'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='202');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '305','Executive Business Room','EXECUTIVE','Designed for business travelers. Features a dedicated workspace, high-speed WiFi, premium coffee machine, and access to the exclusive executive lounge with complimentary breakfast.',199.00,2,3,42.0,'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='305');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '410','Family Comfort Suite','FAMILY','Spacious Family Suite with two bedrooms, living area, and two bathrooms. Features bunk beds for kids, entertainment system, and family-sized amenities.',179.00,4,4,65.0,'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='410');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '501','Luxury Junior Suite','SUITE','Our Junior Suite offers a separate living area, king bed, luxury bath products, espresso machine, and spectacular panoramic views. Includes daily breakfast and evening cocktails.',249.00,2,5,72.0,'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='501');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '601','Presidential Grand Suite','PRESIDENTIAL','The pinnacle of luxury. Our Presidential Suite features two floors with a private terrace, personal butler, grand piano, dining room for 8, and unparalleled city views.',499.00,4,6,180.0,'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='601');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '103','Ocean View Standard','STANDARD','Wake up to breathtaking ocean views. Queen bed, private balcony, and direct ocean views. A serene retreat for beach lovers.',119.00,2,1,30.0,'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='103');

INSERT INTO rooms (room_number, name, type, description, price_per_night, capacity, floor, size, image_url, extra_images, status)
SELECT '204','Deluxe Pool View Room','DELUXE','Overlooking our stunning infinity pool. King bed, spacious bathroom, private balcony with pool views, and premium in-room amenities.',169.00,2,2,40.0,'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop','','AVAILABLE'
WHERE NOT EXISTS (SELECT 1 FROM rooms WHERE room_number='204');

-- Room amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Air Conditioning','Flat Screen TV','Room Service') WHERE r.room_number='101'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Air Conditioning','Flat Screen TV','Mini Bar') WHERE r.room_number='202'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Restaurant','Air Conditioning','Flat Screen TV') WHERE r.room_number='305'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Air Conditioning','Flat Screen TV','Room Service') WHERE r.room_number='410'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Swimming Pool','Spa & Wellness','Mini Bar') WHERE r.room_number='501'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Swimming Pool','Gym & Fitness','Spa & Wellness','Restaurant','Mini Bar','Parking','Airport Shuttle') WHERE r.room_number='601'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Air Conditioning','Flat Screen TV') WHERE r.room_number='103'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);

INSERT INTO room_amenities (room_id, amenity_id)
SELECT r.id, a.id FROM rooms r JOIN amenities a ON a.name IN ('Free WiFi','Swimming Pool','Air Conditioning','Flat Screen TV') WHERE r.room_number='204'
AND NOT EXISTS (SELECT 1 FROM room_amenities ra WHERE ra.room_id=r.id AND ra.amenity_id=a.id);
