package com.akkena.hyperion.dto;

import lombok.Data;

@Data
public class OrderRequestDTO {
    private String productId;
    private Integer quantity;
    private String customerId;
}
