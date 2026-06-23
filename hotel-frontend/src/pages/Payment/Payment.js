import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBookingById, processPayment } from '../../services/api';
import { toast } from 'react-toastify';
import './Payment.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const PAYMENT_METHODS = [
  { id: 'CREDIT_CARD', label: 'Credit Card', icon: '💳' },
  { id: 'DEBIT_CARD', label: 'Debit Card', icon: '🏦' },
  { id: 'UPI', label: 'UPI', icon: '📱' },
  { id: 'NET_BANKING', label: 'Net Banking', icon: '🖥️' },
  { id: 'CASH', label: 'Pay at Hotel', icon: '💵' },
];

const BANKS = ['State Bank', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Yes Bank'];

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1a1a2e',
      '::placeholder': { color: '#aab7c4' },
      fontFamily: 'system-ui, sans-serif',
    },
    invalid: { color: '#e74c3c' },
  },
};

// ─── Inner form — must be inside <Elements> to use useStripe/useElements ──────
const PaymentForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState('CREDIT_CARD');
  const [success, setSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bankName, setBankName] = useState('');

  const isCard = method === 'CREDIT_CARD' || method === 'DEBIT_CARD';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let stripePaymentMethodId;

      if (isCard) {
        if (!stripe || !elements) {
          toast.error('Stripe has not loaded yet. Please wait a moment.');
          setSubmitting(false);
          return;
        }

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (error) {
          toast.error(error.message);
          setSubmitting(false);
          return;
        }

        stripePaymentMethodId = paymentMethod.id;
      }

      const payload = {
        bookingId: +booking.id,
        method,
        ...(isCard ? { stripePaymentMethodId } : {}),
        ...(method === 'UPI' ? { upiId } : {}),
        ...(method === 'NET_BANKING' ? { bankName } : {}),
      };

      const res = await processPayment(payload);
      setTxnId(res.data.transactionId);
      setSuccess(true);
      toast.success('Payment successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="payment-success-page">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p className="success-txn">Transaction ID: <strong>{txnId}</strong></p>
          <div className="success-details">
            <div className="success-row"><span>Room</span><strong>{booking.room?.name}</strong></div>
            <div className="success-row"><span>Check-in</span><strong>{booking.checkIn}</strong></div>
            <div className="success-row"><span>Check-out</span><strong>{booking.checkOut}</strong></div>
            <div className="success-row"><span>Amount Paid</span><strong>${booking.totalAmount?.toFixed(2)}</strong></div>
          </div>
          <p className="success-msg">
            A confirmation has been sent to your email. We look forward to welcoming you!
          </p>
          <button className="btn-go-dashboard" onClick={() => navigate('/dashboard')}>
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div className="payment-header-overlay" />
        <div className="payment-header-content">
          <p className="section-pre">Step 2 of 2</p>
          <h1>Secure Payment</h1>
        </div>
      </div>

      <div className="payment-layout">
        <div className="payment-form-section">
          <div className="demo-notice">
            <strong>Demo Mode</strong> — No real payments are processed. Use test card: <code>4242 4242 4242 4242</code>, any future date, any CVV.
          </div>

          <h2>Choose Payment Method</h2>
          <div className="payment-divider" />

          <div className="payment-methods-grid">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                className={`payment-method-btn ${method === m.id ? 'active' : ''}`}
                onClick={() => setMethod(m.id)}
                type="button"
              >
                <span className="pm-icon">{m.icon}</span>
                <span className="pm-label">{m.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="payment-form">
            {isCard && (
              <div className="card-form">
                <div className="form-group">
                  <label>Card Details *</label>
                  <div className="stripe-card-element">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                  </div>
                  <p className="form-hint">Powered by Stripe — your card details never touch our server.</p>
                </div>
              </div>
            )}

            {method === 'UPI' && (
              <div className="form-group">
                <label>UPI ID *</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
                <p className="form-hint">Example: name@okaxis, name@paytm, name@ybl</p>
              </div>
            )}

            {method === 'NET_BANKING' && (
              <div className="form-group">
                <label>Select Bank *</label>
                <select value={bankName} onChange={(e) => setBankName(e.target.value)} required>
                  <option value="">-- Select Your Bank --</option>
                  {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            )}

            {method === 'CASH' && (
              <div className="cash-info">
                <p>✓ Your room will be reserved.</p>
                <p>✓ Please pay the full amount at the hotel reception upon check-in.</p>
                <p>✓ We accept all major currencies and cards at the property.</p>
              </div>
            )}

            <div className="secure-badge">
              🔒 Your payment is secured with 256-bit SSL encryption
            </div>

            <button type="submit" className="payment-submit" disabled={submitting || (isCard && !stripe)}>
              {submitting ? 'Processing Payment...' : `Pay $${booking.totalAmount?.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <aside className="payment-summary">
          <h2>Order Summary</h2>
          <div className="payment-divider" />

          {booking.room && (
            <div className="payment-room-preview">
              <img src={booking.room.imageUrl} alt={booking.room.name} />
              <div>
                <span className="payment-room-type">{booking.room.type}</span>
                <h3>{booking.room.name}</h3>
              </div>
            </div>
          )}

          <div className="payment-info-rows">
            <div className="payment-info-row"><span>Check-in</span><strong>{booking.checkIn}</strong></div>
            <div className="payment-info-row"><span>Check-out</span><strong>{booking.checkOut}</strong></div>
            <div className="payment-info-row"><span>Guests</span><strong>{booking.adults} Adults, {booking.children} Children</strong></div>
          </div>

          <div className="payment-price-breakdown">
            <div className="payment-info-row"><span>Room Total</span><strong>${booking.totalAmount?.toFixed(2)}</strong></div>
            <div className="payment-info-row tax"><span>Tax Included</span><strong>Yes</strong></div>
          </div>

          <div className="payment-total-row">
            <span>Total</span>
            <strong>${booking.totalAmount?.toFixed(2)}</strong>
          </div>

          <div className="payment-security-logos">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 Amex</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

// ─── Outer wrapper — loads booking then provides Stripe context ───────────────
const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookingById(bookingId)
      .then((res) => setBooking(res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false));
  }, [bookingId, navigate]);

  if (loading) return <div className="payment-loading">Loading payment details...</div>;
  if (!booking) return null;

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm booking={booking} />
    </Elements>
  );
};

export default Payment;
