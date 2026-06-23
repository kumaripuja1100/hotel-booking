import axios from 'axios';
import {
  MOCK_ROOMS, MOCK_AMENITIES, MOCK_BOOKINGS, MOCK_PAYMENTS, MOCK_USERS,
  mockLogin, mockRegister, mockGetMyBookings, mockCreateBooking,
  mockCancelBooking, mockProcessPayment, mockGetBookingById, mockRooms,
} from './mockData';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 3000, // short timeout — if no backend, fall back fast
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !token.startsWith('mock-')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ─── Helper: detect backend unavailable (offline OR returning non-JSON 302) ───
const isNetworkError = (err) => {
  if (!err.response) return true;
  if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK' || err.message === 'Network Error') return true;
  // Backend is up but Spring Security is redirecting (302) or returning HTML login page
  const ct = err.response?.headers?.['content-type'] || '';
  if (err.response?.status === 302) return true;
  if (err.response?.status === 200 && ct.includes('text/html')) return true;
  return false;
};

const mock = (data) => Promise.resolve({ data });
const mockFail = (msg) => Promise.reject({ response: { data: { message: msg } } });

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const login = async (data) => {
  try {
    return await api.post('/auth/login', data);
  } catch (err) {
    if (isNetworkError(err)) {
      const result = mockLogin(data.email, data.password);
      if (result) return mock(result);
      return mockFail('Invalid email or password');
    }
    throw err;
  }
};

export const register = async (data) => {
  try {
    return await api.post('/auth/register', data);
  } catch (err) {
    if (isNetworkError(err)) {
      try {
        return mock(mockRegister(data));
      } catch (e) {
        return mockFail(e.message);
      }
    }
    throw err;
  }
};

// ─── Rooms ────────────────────────────────────────────────────────────────────
export const getAllRooms = async () => {
  try { return await api.get('/rooms'); }
  catch (err) { if (isNetworkError(err)) return mock(MOCK_ROOMS); throw err; }
};

export const getRoomById = async (id) => {
  try { return await api.get(`/rooms/${id}`); }
  catch (err) {
    if (isNetworkError(err)) {
      const room = MOCK_ROOMS.find((r) => r.id === +id);
      if (room) return mock(room);
      return mockFail('Room not found');
    }
    throw err;
  }
};

export const getAvailableRooms = async () => {
  try { return await api.get('/rooms/available'); }
  catch (err) {
    if (isNetworkError(err)) return mock(MOCK_ROOMS.filter((r) => r.status === 'AVAILABLE'));
    throw err;
  }
};

export const searchRooms = async (checkIn, checkOut, guests) => {
  try { return await api.get('/rooms/search', { params: { checkIn, checkOut, guests } }); }
  catch (err) {
    if (isNetworkError(err)) {
      return mock(MOCK_ROOMS.filter((r) => r.status === 'AVAILABLE' && r.capacity >= +guests));
    }
    throw err;
  }
};

export const getRoomsByType = async (type) => {
  try { return await api.get(`/rooms/type/${type}`); }
  catch (err) {
    if (isNetworkError(err)) return mock(MOCK_ROOMS.filter((r) => r.type === type));
    throw err;
  }
};

// ─── Amenities ────────────────────────────────────────────────────────────────
export const getAmenities = async () => {
  try { return await api.get('/amenities'); }
  catch (err) { if (isNetworkError(err)) return mock(MOCK_AMENITIES); throw err; }
};

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const createBooking = async (data) => {
  try { return await api.post('/bookings', data); }
  catch (err) {
    if (isNetworkError(err)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      try {
        return mock(mockCreateBooking(data, user.email, user.name));
      } catch (e) { return mockFail(e.message); }
    }
    throw err;
  }
};

export const getMyBookings = async () => {
  try { return await api.get('/bookings/my'); }
  catch (err) {
    if (isNetworkError(err)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return mock(mockGetMyBookings(user.email));
    }
    throw err;
  }
};

export const getBookingById = async (id) => {
  try { return await api.get(`/bookings/${id}`); }
  catch (err) {
    if (isNetworkError(err)) {
      const booking = mockGetBookingById(id);
      if (booking) return mock(booking);
      return mockFail('Booking not found');
    }
    throw err;
  }
};

export const cancelBooking = async (id) => {
  try { return await api.post(`/bookings/${id}/cancel`); }
  catch (err) {
    if (isNetworkError(err)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      try { return mock(mockCancelBooking(id, user.email)); }
      catch (e) { return mockFail(e.message); }
    }
    throw err;
  }
};

// ─── Payments ─────────────────────────────────────────────────────────────────
export const processPayment = async (data) => {
  try { return await api.post('/payments', data); }
  catch (err) {
    if (isNetworkError(err)) {
      try { return mock(mockProcessPayment(data)); }
      catch (e) { return mockFail(e.message); }
    }
    throw err;
  }
};

export const getPaymentByBooking = async (bookingId) => {
  try { return await api.get(`/payments/booking/${bookingId}`); }
  catch (err) { if (isNetworkError(err)) return mockFail('Payment not found'); throw err; }
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminGetAllRooms = async () => {
  try { return await api.get('/admin/rooms'); }
  catch (err) { if (isNetworkError(err)) return mock(MOCK_ROOMS); throw err; }
};

export const adminCreateRoom = async (data) => {
  try { return await api.post('/admin/rooms', data); }
  catch (err) {
    if (isNetworkError(err)) {
      const newRoom = { ...data, id: Date.now(), amenities: [], status: data.status || 'AVAILABLE' };
      mockRooms.push(newRoom);
      return mock(newRoom);
    }
    throw err;
  }
};

export const adminUpdateRoom = async (id, data) => {
  try { return await api.put(`/admin/rooms/${id}`, data); }
  catch (err) { if (isNetworkError(err)) return mock({ ...data, id }); throw err; }
};

export const adminDeleteRoom = async (id) => {
  try { return await api.delete(`/admin/rooms/${id}`); }
  catch (err) {
    if (isNetworkError(err)) {
      const idx = mockRooms.findIndex((r) => r.id === +id);
      if (idx !== -1) mockRooms.splice(idx, 1);
      return mock({});
    }
    throw err;
  }
};

export const adminUpdateRoomStatus = async (id, status) => {
  try { return await api.patch(`/admin/rooms/${id}/status`, null, { params: { status } }); }
  catch (err) {
    if (isNetworkError(err)) {
      const room = mockRooms.find((r) => r.id === +id);
      if (room) room.status = status;
      return mock({});
    }
    throw err;
  }
};

export const adminGetAllBookings = async () => {
  try { return await api.get('/admin/bookings'); }
  catch (err) {
    if (isNetworkError(err)) {
      const stored = JSON.parse(localStorage.getItem('mockUserBookings') || '[]');
      return mock([...MOCK_BOOKINGS, ...stored]);
    }
    throw err;
  }
};

export const adminUpdateBookingStatus = async (id, status) => {
  try { return await api.patch(`/admin/bookings/${id}/status`, null, { params: { status } }); }
  catch (err) {
    if (isNetworkError(err)) {
      const b = MOCK_BOOKINGS.find((b) => b.id === +id);
      if (b) b.status = status;
      return mock(b || {});
    }
    throw err;
  }
};

export const adminGetAllPayments = async () => {
  try { return await api.get('/admin/payments'); }
  catch (err) { if (isNetworkError(err)) return mock(MOCK_PAYMENTS); throw err; }
};

export const adminGetAllUsers = async () => {
  try { return await api.get('/admin/users'); }
  catch (err) {
    if (isNetworkError(err)) {
      const guests = JSON.parse(localStorage.getItem('mockGuests') || '[]');
      return mock([...MOCK_USERS, ...guests.map((g) => ({ ...g, role: 'GUEST', createdAt: new Date().toISOString() }))]);
    }
    throw err;
  }
};

export default api;
