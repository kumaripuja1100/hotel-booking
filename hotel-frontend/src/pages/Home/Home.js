import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import RoomCard from '../../components/RoomCard/RoomCard';
import { getAllRooms, getAmenities } from '../../services/api';
import './Home.css';

const amenityIcons = {
  'Free WiFi': '📶',
  'Swimming Pool': '🏊',
  'Gym & Fitness': '💪',
  'Spa & Wellness': '💆',
  'Restaurant': '🍽️',
  'Bar & Lounge': '🍸',
  'Room Service': '🛎️',
  'Air Conditioning': '❄️',
  'Flat Screen TV': '📺',
  'Mini Bar': '🍾',
  'Parking': '🚗',
  'Airport Shuttle': '✈️',
};

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    getAllRooms()
      .then((res) => setFeaturedRooms(res.data.slice(0, 3)))
      .catch(() => {});
    getAmenities()
      .then((res) => setAmenities(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-pre">Welcome to</p>
          <h1 className="hero-title">
            Grand Luxe<br />Hotel & Resorts
          </h1>
          <p className="hero-sub">
            Where luxury meets comfort. Experience the extraordinary.
          </p>
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
        <div className="hero-scroll">↓ Scroll</div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-num">250+</span>
          <span className="stat-label">Luxury Rooms</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">15+</span>
          <span className="stat-label">Years of Excellence</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">50k+</span>
          <span className="stat-label">Happy Guests</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">5★</span>
          <span className="stat-label">Rating</span>
        </div>
      </section>

      {/* About */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-images">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format&fit=crop"
              alt="Hotel Lobby"
              className="about-img-main"
            />
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&auto=format&fit=crop"
              alt="Hotel Pool"
              className="about-img-accent"
            />
          </div>
          <div className="about-text">
            <p className="section-pre">About Us</p>
            <h2 className="section-title-left">A Legacy of Luxury & Hospitality</h2>
            <div className="gold-line" />
            <p>
              Grand Luxe Hotel & Resorts has been synonymous with unparalleled luxury and
              world-class hospitality for over 15 years. Nestled in the heart of the city,
              our hotel offers an exquisite blend of modern elegance and timeless comfort.
            </p>
            <p>
              From our meticulously designed rooms to our award-winning restaurants and
              spa facilities, every aspect of your stay is crafted to exceed expectations.
            </p>
            <Link to="/rooms" className="btn-primary">Explore Rooms</Link>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="featured-rooms" id="rooms">
        <p className="section-pre">Our Accommodations</p>
        <h2 className="section-title">Rooms & Suites</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Choose from our curated collection of luxury accommodations
        </p>
        {featuredRooms.length > 0 ? (
          <div className="rooms-grid">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="rooms-placeholder">
            <p>Connect to backend to view rooms</p>
          </div>
        )}
        <Link to="/rooms" className="btn-primary view-all">View All Rooms</Link>
      </section>

      {/* Amenities */}
      <section className="amenities-section" id="amenities">
        <p className="section-pre">Hotel Features</p>
        <h2 className="section-title">World-Class Amenities</h2>
        <div className="gold-divider" />
        <p className="section-subtitle">Everything you need for a perfect stay</p>
        <div className="amenities-grid">
          {(amenities.length > 0
            ? amenities
            : Object.keys(amenityIcons).map((name, i) => ({ id: i, name, icon: '', description: '' }))
          ).map((a) => (
            <div key={a.id} className="amenity-card">
              <div className="amenity-icon">{amenityIcons[a.name] || '✨'}</div>
              <h3>{a.name}</h3>
              {a.description && <p>{a.description}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <p className="section-pre">Guest Reviews</p>
        <h2 className="section-title">What Our Guests Say</h2>
        <div className="gold-divider" />
        <div className="testimonials-grid">
          {[
            {
              name: 'Sarah Mitchell',
              role: 'Business Executive',
              text: 'Absolutely stunning hotel. The Presidential Suite exceeded all my expectations. The staff was impeccably professional and the amenities were world-class.',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
            },
            {
              name: 'James Rodriguez',
              role: 'Travel Blogger',
              text: 'Grand Luxe sets the gold standard for luxury hospitality. Every detail, from the room decor to the dining experience, was meticulously crafted.',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
            },
            {
              name: 'Emily Chen',
              role: 'Anniversary Celebration',
              text: 'We celebrated our anniversary here and it was magical. The spa, the rooftop bar, the breakfast — everything was perfect. We will definitely return!',
              rating: 5,
              img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
            },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <img src={t.img} alt={t.name} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-overlay" />
        <div className="cta-content">
          <h2>Ready for an Unforgettable Stay?</h2>
          <p>Book directly and enjoy exclusive benefits, best rate guarantee, and personalized service.</p>
          <div className="cta-btns">
            <Link to="/rooms" className="btn-primary">Book Your Stay</Link>
            <a href="tel:+15551234567" className="btn-outline-white">Call Us Now</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
