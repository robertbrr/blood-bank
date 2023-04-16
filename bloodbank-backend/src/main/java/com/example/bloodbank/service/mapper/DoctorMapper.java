package com.example.bloodbank.service.mapper;

import com.example.bloodbank.dto.DoctorCreateDTO;
import com.example.bloodbank.entity.Doctor;
import com.example.bloodbank.entity.DonationCenter;
import org.springframework.stereotype.Component;

@Component
public class DoctorMapper {

    public Doctor toDoctor(DoctorCreateDTO dto){
        Doctor doctor = new Doctor();
        doctor.setEmail(dto.getEmail());
        doctor.setCNP(dto.getCnp());
        doctor.setFirstName(dto.getFirstName());
        doctor.setLastName(dto.getLastName());
        doctor.setUsername(dto.getUsername());
        doctor.setPassword(dto.getPassword());
        DonationCenter donationCenter = new DonationCenter();
        donationCenter.setId(dto.getDonationCenterId());
        doctor.setDonationCenter(donationCenter);
        return doctor;
    }
}
