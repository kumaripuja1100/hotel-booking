package com.hotel.dto;

import com.hotel.model.enums.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class PaymentRequest {
    @NotNull
    private Long bookingId;

    @NotNull
    private PaymentMethod method;

    // For CREDIT_CARD / DEBIT_CARD: Stripe PaymentMethod ID created client-side.
    // Raw card numbers must never be sent here.
    private String stripePaymentMethodId;

    // UPI field — validated only when method is UPI, pattern keeps format sane
    @Pattern(regexp = "^[\\w.]+@[\\w]+$", message = "Invalid UPI ID format")
    private String upiId;

    // Net Banking field
    private String bankName;

    // NOTE: Raw card numbers, CVV, and expiry must never be sent here.
    // Integrate a payment gateway (e.g. Stripe) and pass only its payment token.
}
