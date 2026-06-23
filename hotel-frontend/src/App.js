import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';
import RoomDetail from './pages/RoomDetail/RoomDetail';
import Booking from './pages/Booking/Booking';
import Payment from './pages/Payment/Payment';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import GuestDashboard from './pages/GuestDashboard/GuestDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
  return children;
};

function AppContent() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/booking/:roomId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:bookingId"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="GUEST">
                <GuestDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <AppContent />
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
