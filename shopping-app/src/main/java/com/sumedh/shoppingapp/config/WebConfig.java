package com.sumedh.shoppingapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Iska matlab: Agar URL me "/uploads/**" aaye, to project ke bahar "uploads" folder me dhundo
        // "file:uploads/" ka matlab hai jahan project run ho raha hai wahan ek uploads folder banega.
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}