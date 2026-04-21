package com.akkena.hyperion.service;

import com.akkena.hyperion.dto.OrderRequestDTO;
import com.akkena.hyperion.model.Order;
import com.akkena.hyperion.model.OrderStatus;
import com.akkena.hyperion.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final StringRedisTemplate redisTemplate;
    private final OrderRepository orderRepository;

    private static final String INVENTORY_KEY_PREFIX = "inventory:";

    /**
     * Highly synchronous but fast Redis check.
     */
    public boolean processOrderSync(OrderRequestDTO request) {
        String redisKey = INVENTORY_KEY_PREFIX + request.getProductId();
        
        // Initialize inventory to 999 if it doesn't exist yet!
        redisTemplate.opsForValue().setIfAbsent(redisKey, "999");
        
        // Atomically decrement the inventory in Redis
        Long remaining = redisTemplate.opsForValue().decrement(redisKey, request.getQuantity());

        if (remaining != null && remaining >= 0) {
            log.info("Redis Check OK: Product {} has {} remaining. Deferring DB write.", request.getProductId(), remaining);
            persistOrderAsync(request);
            return true;
        } else {
            // Revert the decrement if we went below zero
            redisTemplate.opsForValue().increment(redisKey, request.getQuantity());
            log.warn("Redis Check FAILED: Insufficient inventory for product {}", request.getProductId());
            return false;
        }
    }

    /**
     * Asynchronous database write so the user request isn't blocked by slow I/O locks.
     */
    @Async
    protected void persistOrderAsync(OrderRequestDTO request) {
        try {
            Order order = Order.builder()
                    .productId(request.getProductId())
                    .quantity(request.getQuantity())
                    .customerId(request.getCustomerId())
                    .status(OrderStatus.CONFIRMED)
                    .createdAt(LocalDateTime.now())
                    .build();
            
            orderRepository.save(order);
            log.info("Async DB Write Successful for Order");
        } catch (Exception e) {
            log.error("Failed to persist order to database", e);
        }
    }
}
