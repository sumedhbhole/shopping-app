package com.sumedh.shoppingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sumedh.shoppingapp.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Ye file database se Products nikalne aur save karne ka kaam karegi
}