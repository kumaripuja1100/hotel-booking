// ─── Mock Data for Demo Mode (when backend is not running) ───────────────────

export const MOCK_AMENITIES = [
  { id: 1, name: 'Free WiFi', icon: 'wifi', description: 'High-speed wireless internet' },
  { id: 2, name: 'Swimming Pool', icon: 'pool', description: 'Outdoor heated swimming pool' },
  { id: 3, name: 'Gym & Fitness', icon: 'fitness_center', description: 'Fully equipped modern gym' },
  { id: 4, name: 'Spa & Wellness', icon: 'spa', description: 'Luxury spa and wellness center' },
  { id: 5, name: 'Restaurant', icon: 'restaurant', description: 'Fine dining restaurant' },
  { id: 6, name: 'Bar & Lounge', icon: 'local_bar', description: 'Rooftop bar and lounge' },
  { id: 7, name: 'Room Service', icon: 'room_service', description: '24/7 in-room dining service' },
  { id: 8, name: 'Air Conditioning', icon: 'ac_unit', description: 'Central air conditioning' },
  { id: 9, name: 'Flat Screen TV', icon: 'tv', description: '55-inch smart TV' },
  { id: 10, name: 'Mini Bar', icon: 'local_drink', description: 'Complimentary mini bar' },
  { id: 11, name: 'Parking', icon: 'local_parking', description: 'Free valet parking' },
  { id: 12, name: 'Airport Shuttle', icon: 'airport_shuttle', description: 'Complimentary airport transfers' },
];

export const MOCK_ROOMS = [
  {
    id: 1, roomNumber: '101', name: 'Classic Standard Room', type: 'STANDARD',
    description: 'Our Classic Standard Room offers comfortable accommodation with modern amenities. Featuring a plush queen bed, private bathroom, and garden views. Perfect for solo travelers and couples seeking comfort at a great value.',
    pricePerNight: 99, capacity: 2, floor: 1, size: 28,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[7], MOCK_AMENITIES[8], MOCK_AMENITIES[6]],
  },
  {
    id: 2, roomNumber: '202', name: 'Deluxe City View Room', type: 'DELUXE',
    description: 'Experience elevated comfort in our Deluxe City View Room. Features a king-size bed, premium linens, marble bathroom with soaking tub, and stunning city panorama views from your private balcony.',
    pricePerNight: 149, capacity: 2, floor: 2, size: 38,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[7], MOCK_AMENITIES[8], MOCK_AMENITIES[9]],
  },
  {
    id: 3, roomNumber: '305', name: 'Executive Business Room', type: 'EXECUTIVE',
    description: 'Designed for business travelers, our Executive Room features a dedicated workspace, high-speed WiFi, premium coffee machine, and access to our exclusive executive lounge with complimentary breakfast.',
    pricePerNight: 199, capacity: 2, floor: 3, size: 42,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[4], MOCK_AMENITIES[7], MOCK_AMENITIES[8]],
  },
  {
    id: 4, roomNumber: '410', name: 'Family Comfort Suite', type: 'FAMILY',
    description: 'Spacious Family Suite with two bedrooms, a living area, and two bathrooms. Features bunk beds for kids, entertainment system, and family-sized amenities for the perfect family getaway.',
    pricePerNight: 179, capacity: 4, floor: 4, size: 65,
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[7], MOCK_AMENITIES[8], MOCK_AMENITIES[6]],
  },
  {
    id: 5, roomNumber: '501', name: 'Luxury Junior Suite', type: 'SUITE',
    description: 'Our Junior Suite offers a separate living area, king bed, luxury bath products, espresso machine, and spectacular panoramic views. Includes daily breakfast and evening cocktails at the rooftop bar.',
    pricePerNight: 249, capacity: 2, floor: 5, size: 72,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop',
    status: 'BOOKED',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[1], MOCK_AMENITIES[3], MOCK_AMENITIES[9]],
  },
  {
    id: 6, roomNumber: '601', name: 'Presidential Grand Suite', type: 'PRESIDENTIAL',
    description: 'The pinnacle of luxury — our Presidential Suite spans two floors with a private terrace, personal butler, grand piano, private dining room for 8 guests, and breathtaking panoramic city views.',
    pricePerNight: 499, capacity: 4, floor: 6, size: 180,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[1], MOCK_AMENITIES[2], MOCK_AMENITIES[3], MOCK_AMENITIES[4], MOCK_AMENITIES[9]],
  },
  {
    id: 7, roomNumber: '103', name: 'Ocean View Standard', type: 'STANDARD',
    description: 'Wake up to breathtaking ocean views. This standard room features a comfortable queen bed, private balcony, and direct ocean views. A serene retreat for beach lovers.',
    pricePerNight: 119, capacity: 2, floor: 1, size: 30,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    status: 'AVAILABLE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[7], MOCK_AMENITIES[8]],
  },
  {
    id: 8, roomNumber: '204', name: 'Deluxe Pool View Room', type: 'DELUXE',
    description: 'Overlooking our stunning infinity pool, this Deluxe Room features a king bed, spacious bathroom, private balcony with pool views, and premium in-room amenities.',
    pricePerNight: 169, capacity: 2, floor: 2, size: 40,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop',
    status: 'MAINTENANCE',
    amenities: [MOCK_AMENITIES[0], MOCK_AMENITIES[1], MOCK_AMENITIES[7], MOCK_AMENITIES[8]],
  },
];

export const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@grandluxe.com', phone: '+1-555-0100', role: 'ADMIN', createdAt: '2024-01-01T00:00:00' },
  { id: 2, name: 'John Smith', email: 'john@example.com', phone: '+1-555-0101', role: 'GUEST', createdAt: '2024-02-15T00:00:00' },
  { id: 3, name: 'Sarah Lee', email: 'sarah@example.com', phone: '+1-555-0102', role: 'GUEST', createdAt: '2024-03-10T00:00:00' },
];

export const MOCK_BOOKINGS = [
  {
    id: 1, guest: MOCK_USERS[1], room: MOCK_ROOMS[0],
    checkIn: '2026-04-25', checkOut: '2026-04-28',
    adults: 2, children: 0, totalAmount: 297, status: 'CONFIRMED',
    specialRequests: 'High floor preferred', createdAt: '2026-04-20T10:00:00',
  },
  {
    id: 2, guest: MOCK_USERS[2], room: MOCK_ROOMS[1],
    checkIn: '2026-05-01', checkOut: '2026-05-05',
    adults: 2, children: 1, totalAmount: 596, status: 'PENDING',
    specialRequests: '', createdAt: '2026-04-21T09:00:00',
  },
];

export const MOCK_PAYMENTS = [
  {
    id: 1, booking: MOCK_BOOKINGS[0], amount: 297, method: 'CREDIT_CARD',
    status: 'SUCCESS', transactionId: 'TXN-A1B2C3D4',
    paymentDate: '2026-04-20T10:05:00',
  },
];

// ─── Mock Auth ────────────────────────────────────────────────────────────────
const DEMO_CREDENTIALS = {
  'admin@grandluxe.com': { password: 'admin123', role: 'ADMIN', name: 'Admin User', id: 1 },
  'guest@grandluxe.com': { password: 'guest123', role: 'GUEST', name: 'Demo Guest', id: 99 },
};

let mockBookings = [...MOCK_BOOKINGS];
let mockRooms = [...MOCK_ROOMS];
let nextBookingId = 3;

export const mockLogin = (email, password) => {
  const cred = DEMO_CREDENTIALS[email];
  if (cred && cred.password === password) {
    return {
      token: 'mock-jwt-token-' + Date.now(),
      email,
      name: cred.name,
      role: cred.role,
      userId: cred.id,
    };
  }
  // Allow any guest registration that was saved
  const saved = JSON.parse(localStorage.getItem('mockGuests') || '[]');
  const found = saved.find((u) => u.email === email && u.password === password);
  if (found) return { token: 'mock-jwt-' + Date.now(), email, name: found.name, role: 'GUEST', userId: found.id };
  return null;
};

export const mockRegister = (data) => {
  const saved = JSON.parse(localStorage.getItem('mockGuests') || '[]');
  if (saved.find((u) => u.email === data.email)) throw new Error('Email already registered');
  const newUser = { ...data, id: Date.now(), role: 'GUEST' };
  saved.push(newUser);
  localStorage.setItem('mockGuests', JSON.stringify(saved));
  return { token: 'mock-jwt-' + Date.now(), email: data.email, name: data.name, role: 'GUEST', userId: newUser.id };
};

export const mockGetMyBookings = (email) => {
  const all = [...mockBookings, ...JSON.parse(localStorage.getItem('mockUserBookings') || '[]')];
  return all.filter((b) => b.guest?.email === email);
};

export const mockCreateBooking = (data, userEmail, userName) => {
  const room = mockRooms.find((r) => r.id === +data.roomId);
  if (!room) throw new Error('Room not found');
  const nights = Math.ceil((new Date(data.checkOut) - new Date(data.checkIn)) / 86400000);
  const booking = {
    id: nextBookingId++,
    guest: { email: userEmail, name: userName },
    room,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    adults: data.adults || 1,
    children: data.children || 0,
    totalAmount: room.pricePerNight * nights,
    status: 'PENDING',
    specialRequests: data.specialRequests || '',
    createdAt: new Date().toISOString(),
  };
  const stored = JSON.parse(localStorage.getItem('mockUserBookings') || '[]');
  stored.push(booking);
  localStorage.setItem('mockUserBookings', JSON.stringify(stored));
  return booking;
};

export const mockCancelBooking = (id, email) => {
  const stored = JSON.parse(localStorage.getItem('mockUserBookings') || '[]');
  const idx = stored.findIndex((b) => b.id === +id);
  if (idx !== -1) {
    stored[idx].status = 'CANCELLED';
    localStorage.setItem('mockUserBookings', JSON.stringify(stored));
    return stored[idx];
  }
  const b = mockBookings.find((b) => b.id === +id);
  if (b) { b.status = 'CANCELLED'; return b; }
  throw new Error('Booking not found');
};

export const mockProcessPayment = (data) => {
  const all = [...mockBookings, ...JSON.parse(localStorage.getItem('mockUserBookings') || '[]')];
  const booking = all.find((b) => b.id === +data.bookingId);
  if (!booking) throw new Error('Booking not found');

  // Update booking status to CONFIRMED
  const stored = JSON.parse(localStorage.getItem('mockUserBookings') || '[]');
  const idx = stored.findIndex((b) => b.id === +data.bookingId);
  if (idx !== -1) {
    stored[idx].status = 'CONFIRMED';
    localStorage.setItem('mockUserBookings', JSON.stringify(stored));
  }

  return {
    id: Date.now(),
    booking,
    amount: booking.totalAmount,
    method: data.method,
    status: 'SUCCESS',
    transactionId: 'TXN-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    paymentDate: new Date().toISOString(),
  };
};

export const mockGetBookingById = (id) => {
  const stored = JSON.parse(localStorage.getItem('mockUserBookings') || '[]');
  return stored.find((b) => b.id === +id) || mockBookings.find((b) => b.id === +id);
};

export { mockRooms, mockBookings };
