package com.sumedh.shoppingapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sumedh.shoppingapp.model.User;
import com.sumedh.shoppingapp.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React ko allow karega
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        
        // 1. Check: Kya email pehle se registered hai?
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use!");
        }

        // 2. Check: Kya mobile number pehle se registered hai?
        if (userRepository.findByMobileNumber(user.getMobileNumber()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mobile number is already in use!");
        }

        // 3. Default Role set karo agar null hai
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        // 4. User ko Database me Save karo
        User savedUser = userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully!");
    }
    
    // --- LOGIN API ---
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginDetails) {
        
        // 1. Email se user dhundo
        Optional<User> user = userRepository.findByEmail(loginDetails.getEmail());

        // 2. Agar user mila aur password sahi hai
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            return ResponseEntity.ok(user.get()); // Pura user object wapas bhejo (taaki dashboard par naam dikha sake)
        }

        // 3. Agar galat hai
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
    }
}