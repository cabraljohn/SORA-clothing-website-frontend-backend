package com.sora.fashion.model;

import javax.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User user;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;
    
    private BigDecimal total;
    private String status;
    private LocalDateTime date = LocalDateTime.now();
} 