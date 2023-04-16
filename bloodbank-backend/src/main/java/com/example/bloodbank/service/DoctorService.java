package com.example.bloodbank.service;

import com.example.bloodbank.dto.DoctorCreateDTO;
import com.example.bloodbank.entity.Doctor;
import com.example.bloodbank.entity.DonationCenter;

import java.util.List;
import java.util.UUID;

public interface DoctorService {

    void updateDoctor(Doctor doctor);

    void saveDoctor(DoctorCreateDTO dto);

    Doctor findById(UUID id);

    void deleteDoctorById(UUID id);

    List<Doctor> findAll();

    DonationCenter findDoctorDonationCenter(UUID id);
}
