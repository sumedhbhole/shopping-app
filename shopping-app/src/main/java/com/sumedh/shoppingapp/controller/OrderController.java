package com.sumedh.shoppingapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.sumedh.shoppingapp.model.Order;
import com.sumedh.shoppingapp.model.User;
import com.sumedh.shoppingapp.repository.OrderRepository;
import com.sumedh.shoppingapp.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    // 1. ORDER PLACE (Clean Text "PLACED")
    @PostMapping("/place")
    public Order placeOrder(@RequestBody Map<String, Object> orderData) {
        String email = (String) orderData.get("email");
        Double totalPrice = Double.valueOf(orderData.get("totalPrice").toString());
        User user = userRepository.findByEmail(email).orElse(null);
        
        if (user == null) throw new RuntimeException("User not found: " + email);

        Order order = new Order();
        order.setUser(user);
        order.setTotalPrice(totalPrice);
        order.setStatus("PLACED"); // ✅ No Emoji here
        order.setOrderDate(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // 2. GET ALL ORDERS
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    // 3. UPDATE STATUS (Admin jo text bhejega wahi save hoga)
    @PostMapping("/updateStatus")
    public Order updateOrderStatus(@RequestBody Map<String, Object> data) {
        Long orderId = Long.valueOf(data.get("orderId").toString());
        String status = (String) data.get("status");

        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            return orderRepository.save(order);
        }
        return null;
    }

    // 4. USER ORDERS (Regex fix included)
    @GetMapping("/user/{email:.+}")
    public List<Order> getUserOrders(@PathVariable String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            return orderRepository.findByUserId(user.getId());
        }
        return List.of(); 
    }
}