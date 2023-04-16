package com.example.bloodbank.controller;

import com.example.bloodbank.dto.UserCredentialsDTO;
import com.example.bloodbank.dto.UserDTO;

import com.example.bloodbank.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class LoginController {

    private final UserService userService;

    public LoginController( UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    ResponseEntity<?> login(@RequestBody UserCredentialsDTO dto){
        try {
            UserDTO userDTO = userService.getUserInfo(dto);
            return ResponseEntity.ok(userDTO);
        }catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body("Invalid credentials!");
        }
    }
}