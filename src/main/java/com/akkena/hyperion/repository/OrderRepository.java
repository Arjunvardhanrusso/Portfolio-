package com.akkena.hyperion.repository;

import com.akkena.hyperion.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}
