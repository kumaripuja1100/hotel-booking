# Grand Luxe Hotel & Resorts — Booking System

A full-stack hotel booking web application with role-based access control, JWT authentication, and a complete room booking + payment flow.

---

## Tech Stack

**Frontend**
- React 18 (Create React App)
- React Router v6 — client-side routing
- Context API — global auth and booking state
- Axios — API calls with automatic mock fallback
- React DatePicker, React Toastify
- Pure CSS (no UI library)

**Backend**
- Java 17 + Spring Boot 3.2
- Spring Security + JWT — stateless authentication
- Spring Data JPA + Hibernate
- H2 in-memory database (dev) / PostgreSQL (prod-ready)
- Lombok, BCrypt password hashing

---

## Features

- **Room browsing** — filter by type, availability, sort by price/capacity
- **Search** — search rooms by check-in, check-out, and guest count
- **Authentication** — register/login with JWT, role-based access (GUEST / ADMIN)
- **Booking flow** — 2-step process: booking details → payment
- **Payment** — Credit/Debit card (Stripe), UPI, Net Banking, Cash
- **Guest dashboard** — view and cancel bookings
- **Admin dashboard** — manage rooms, bookings, payments, users
- **Offline mode** — frontend works fully with mock data when backend is down

---

## Project Structure

```
hotel-booking/
├── hotel-frontend/        # React app
│   ├── src/
│   │   ├── components/    # Header, Footer, SearchBar, RoomCard
│   │   ├── pages/         # Home, Rooms, RoomDetail, Booking, Payment, Dashboards
│   │   ├── context/       # AuthContext, BookingContext
│   │   └── services/      # API calls + mock data fallback
│   └── package.json
│
├── hotel-backend/         # Spring Boot app
│   ├── src/main/java/com/hotel/
│   │   ├── controller/    # REST endpoints
│   │   ├── service/       # Business logic
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Spring Data repositories
│   │   ├── security/      # JWT filter, UserDetailsService
│   │   └── config/        # SecurityConfig, CORS
│   └── pom.xml
│
└── .gitignore
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.8+

### 1. Clone the repo
```bash
git clone https://github.com/kumaripuja1100/hotel-booking.git
cd hotel-booking
```

### 2. Backend setup
```bash
cd hotel-backend
```

Create `src/main/resources/application-local.properties` (gitignored — never committed):
```properties
jwt.secret=your_jwt_secret_key_here
stripe.secret-key=sk_test_your_stripe_key_here
```

Run the backend:
```bash
./mvnw spring-boot:run
```
Backend starts at `http://localhost:8080`

### 3. Frontend setup
```bash
cd hotel-frontend
npm install
npm start
```
Frontend starts at `http://localhost:3000`

> **Note:** The frontend works without the backend — it automatically falls back to mock data if the backend is unavailable.

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@grandluxe.com | admin123 |
| Guest | guest@grandluxe.com | guest123 |

---

## UI Flow

```
Home (/) → Search rooms → /rooms
  → Click room → /rooms/:id (Room Detail)
    → Book Now → /booking/:roomId  (Step 1 — requires login)
      → Confirm → /payment/:bookingId  (Step 2)
        → Payment success → /dashboard
```

**Protected routes:**
- `/booking/:roomId` — any logged-in user
- `/dashboard` — GUEST role only
- `/admin` — ADMIN role only

---

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/rooms` | Public |
| GET | `/api/rooms/:id` | Public |
| GET | `/api/rooms/search` | Public |
| POST | `/api/bookings` | Authenticated |
| GET | `/api/bookings/my` | Authenticated |
| POST | `/api/bookings/:id/cancel` | Authenticated |
| POST | `/api/payments` | Authenticated |
| GET | `/api/admin/**` | ADMIN only |

---

## Environment Variables

Copy the example files and fill in your values:

**Backend** — `hotel-backend/src/main/resources/application-local.properties`
```properties
jwt.secret=             # any long random string
stripe.secret-key=      # from dashboard.stripe.com
```

**Frontend** — not required for local dev (Stripe card UI needs publishable key in Payment.js)

---

## Security

- Passwords hashed with BCrypt
- JWT tokens expire in 24 hours
- Admin routes protected at both Spring Security config and controller level (`@PreAuthorize`)
- CORS restricted to `localhost:3000`
- Secrets never committed — managed via `application-local.properties` (gitignored)
