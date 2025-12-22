package com.sumedh.shoppingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sumedh.shoppingapp.model.Order;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Kisi specific user ke orders dhundne ke liye method
    List<Order> findByUserId(Long userId);
    
    // Saare orders naye se purane (Latest first) dikhane ke liye
    List<Order> findAllByOrderByOrderDateDesc();
}