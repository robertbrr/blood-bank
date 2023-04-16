package com.example.bloodbank.service.impl;

import com.example.bloodbank.dto.UserCredentialsDTO;
import com.example.bloodbank.dto.UserDTO;
import com.example.bloodbank.entity.User;

import com.example.bloodbank.repository.UserRepository;
import com.example.bloodbank.service.UserService;
import com.example.bloodbank.service.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO getUserInfo(UserCredentialsDTO dto) {
        Optional<User> user = userRepository.findByUsername(dto.getUsername());
        if (user.isEmpty() || !dto.getPassword().equals(user.get().getPassword())) {
            throw new InvalidParameterException("Invalid credentials!!");
        }
        return userMapper.toDTO(user.get());
    }
}
