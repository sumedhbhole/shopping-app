package com.sumedh.shoppingapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Yahan humne "/api/orders/**" add kiya hai
                .requestMatchers("/api/auth/**", "/api/products/**", "/uploads/**", "/api/orders/**").permitAll()
                .anyRequest().authenticated()
            );
        
        return http.build();
    }
}