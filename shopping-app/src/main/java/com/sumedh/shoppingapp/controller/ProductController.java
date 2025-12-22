package com.sumedh.shoppingapp.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.sumedh.shoppingapp.model.Category;
import com.sumedh.shoppingapp.model.Product;
import com.sumedh.shoppingapp.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Folder jahan photos save hongi (Project ke bahar banta hai usually)
    private final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // --- 🟢 IMAGE UPLOAD API ---
    @PostMapping("/add")
    public Product addProduct(
            @RequestParam("file") MultipartFile file, 
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestParam("categoryId") Long categoryId
    ) throws IOException {

        // 1. Folder Create karo agar nahi hai
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 2. File ka unique naam banao (taaki overwrite na ho)
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // 3. File Save karo
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // 4. URL Generate karo (Jisse frontend photo dikha sake)
        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(fileName)
                .toUriString();

        // 5. Database me save karo
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(java.math.BigDecimal.valueOf(price));
        product.setStockQuantity(stockQuantity);
        product.setImageUrl(fileUrl); // URL set kiya (Image path)
        
        Category category = new Category();
        category.setId(categoryId);
        product.setCategory(category);

        return productRepository.save(product);
    }
}