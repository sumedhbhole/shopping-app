package com.sumedh.shoppingapp.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sumedh.shoppingapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Login aur Sign up ke liye Email check karne ka method
    Optional<User> findByEmail(String email);
    
    // Mobile number check karne ke liye (Optional)
    Optional<User> findByMobileNumber(String mobileNumber);
}