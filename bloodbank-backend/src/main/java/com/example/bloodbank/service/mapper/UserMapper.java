package com.example.bloodbank.service.mapper;

import com.example.bloodbank.dto.UserDTO;
import com.example.bloodbank.entity.Doctor;
import com.example.bloodbank.entity.Donor;
import com.example.bloodbank.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user){
        UserDTO userDTO = new UserDTO();
        if(user instanceof Donor) {
            userDTO.setRole("DONOR");
        }else if(user instanceof Doctor){
            userDTO.setRole("DOCTOR");
        }else {
            userDTO.setRole("ADMIN");
        }
        userDTO.setUuid(user.getId());
        return userDTO;
    }
}
