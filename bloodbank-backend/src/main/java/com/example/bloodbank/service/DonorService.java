package com.example.bloodbank.service;

import com.example.bloodbank.dto.DonorCreateDTO;
import com.example.bloodbank.dto.DonorDTO;
import com.example.bloodbank.dto.DonorUpdateDTO;
import com.example.bloodbank.entity.Donor;

import java.util.UUID;

public interface DonorService {

    DonorDTO saveDonor(DonorCreateDTO donorCreateDTO);

    void updateDonor(DonorUpdateDTO dto);

    Donor findByID(UUID id);

    void deleteDonorById(UUID id);

}

