package com.example.bloodbank.service.mapper;

import com.example.bloodbank.dto.DonorCreateDTO;
import com.example.bloodbank.dto.DonorDTO;
import com.example.bloodbank.dto.DonorUpdateDTO;
import com.example.bloodbank.entity.Donor;
import org.springframework.stereotype.Component;


@Component
public class DonorMapper {

    public Donor toDonor(DonorCreateDTO dto){
        Donor donor = new Donor();
        donor.setUsername(dto.getUsername());
        donor.setPassword(dto.getPassword());
        donor.setEmail(dto.getEmail());
        donor.setFirstName(dto.getFirstName());
        donor.setLastName(dto.getLastName());
        donor.setPhoneNumber(dto.getPhoneNumber());
        donor.setBloodType(dto.getBloodType());
        return donor;
    }

    public Donor toDonor(DonorUpdateDTO dto){
        Donor donor = new Donor();
        donor.setId(dto.getId());
        donor.setUsername(dto.getUsername());
        donor.setPassword(dto.getPassword());
        donor.setEmail(dto.getEmail());
        donor.setFirstName(dto.getFirstName());
        donor.setLastName(dto.getLastName());
        donor.setPhoneNumber(dto.getPhoneNumber());
        donor.setBloodType(dto.getBloodType());
        return donor;
    }

    public DonorDTO toDTO(Donor donor){
        DonorDTO donorDTO=new DonorDTO();
        donorDTO.setEmail(donor.getEmail());
        donorDTO.setFirstName(donor.getFirstName());
        donorDTO.setUuid(donor.getId());
        donorDTO.setLastName(donor.getLastName());
        return donorDTO;
    }
}
