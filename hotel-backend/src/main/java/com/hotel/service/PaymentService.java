package com.hotel.service;

import com.hotel.dto.PaymentRequest;
import com.hotel.model.Booking;
import com.hotel.model.Payment;
import com.hotel.model.enums.BookingStatus;
import com.hotel.model.enums.PaymentMethod;
import com.hotel.model.enums.PaymentStatus;
import com.hotel.repository.BookingRepository;
import com.hotel.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Payment processPayment(PaymentRequest request, String email) {
        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getGuest().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        if (booking.getStatus() == BookingStatus.CONFIRMED) {
            throw new RuntimeException("Booking is already paid");
        }

        boolean isCard = request.getMethod() == PaymentMethod.CREDIT_CARD
                || request.getMethod() == PaymentMethod.DEBIT_CARD;

        String transactionId;
        PaymentStatus paymentStatus;

        if (isCard) {
            if (request.getStripePaymentMethodId() == null || request.getStripePaymentMethodId().isBlank()) {
                throw new RuntimeException("Stripe payment method ID is required for card payments");
            }
            transactionId = chargeWithStripe(booking.getTotalAmount(), request.getStripePaymentMethodId());
            paymentStatus = PaymentStatus.SUCCESS;
        } else {
            // UPI / NET_BANKING / CASH / PAYPAL — simulated
            transactionId = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            paymentStatus = PaymentStatus.SUCCESS;
        }

        Payment payment = Payment.builder()
                .booking(booking)
                .amount(booking.getTotalAmount())
                .method(request.getMethod())
                .status(paymentStatus)
                .transactionId(transactionId)
                .upiId(request.getUpiId())
                .build();

        paymentRepository.save(payment);

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);

        return payment;
    }

    private String chargeWithStripe(double totalAmount, String paymentMethodId) {
        try {
            long amountInCents = Math.round(totalAmount * 100);
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency("usd")
                    .setPaymentMethod(paymentMethodId)
                    .setConfirm(true)
                    .setReturnUrl("http://localhost:3000/dashboard") // required for some 3DS flows
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            if (!"succeeded".equals(intent.getStatus())) {
                throw new RuntimeException("Payment was not completed. Status: " + intent.getStatus());
            }

            return intent.getId();
        } catch (StripeException e) {
            throw new RuntimeException("Stripe error: " + e.getMessage());
        }
    }

    public Payment getPaymentByBooking(Long bookingId, String email) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getGuest().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found for booking"));
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}
