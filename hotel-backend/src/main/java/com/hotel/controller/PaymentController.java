package com.hotel.controller;

import com.hotel.dto.PaymentRequest;
import com.hotel.model.Payment;
import com.hotel.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<Payment> processPayment(
            @Valid @RequestBody PaymentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(paymentService.processPayment(request, userDetails.getUsername()));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> getPaymentByBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(paymentService.getPaymentByBooking(bookingId, userDetails.getUsername()));
    }
}
