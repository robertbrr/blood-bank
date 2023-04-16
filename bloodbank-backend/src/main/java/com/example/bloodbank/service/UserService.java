package com.example.bloodbank.service;


import com.example.bloodbank.dto.UserCredentialsDTO;
import com.example.bloodbank.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    UserDTO getUserInfo(UserCredentialsDTO dto);

}
