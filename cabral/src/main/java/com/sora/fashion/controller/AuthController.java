package com.sora.fashion.controller;

import com.sora.fashion.model.User;
import com.sora.fashion.service.UserService;
import com.sora.fashion.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User savedUser = userService.register(user);
        String token = jwtTokenProvider.createToken(savedUser.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, savedUser));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        String token = jwtTokenProvider.createToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user));
    }
} 