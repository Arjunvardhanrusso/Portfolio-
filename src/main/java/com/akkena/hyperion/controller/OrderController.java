package com.akkena.hyperion.controller;

import com.akkena.hyperion.dto.OrderRequestDTO;
import com.akkena.hyperion.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<String> placeOrder(@RequestBody OrderRequestDTO requestDTO) {
        boolean success = orderService.processOrderSync(requestDTO);

        if (success) {
            return ResponseEntity.ok("Order Accepted for Processing!");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Inventory Exhausted or Unavailable.");
        }
    }
}
