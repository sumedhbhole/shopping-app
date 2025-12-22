package com.sumedh.shoppingapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalPrice;
    
    private String status; // e.g., "Placed", "Shipped"

    private LocalDateTime orderDate;

    // Rishta: Ek User ke bahut saare Orders ho sakte hain
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // --- GETTERS & SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}