package com.example.bloodbank.service.impl;


import com.example.bloodbank.dto.DonorCreateDTO;
import com.example.bloodbank.dto.DonorDTO;
import com.example.bloodbank.dto.DonorUpdateDTO;
import com.example.bloodbank.entity.Donor;
import com.example.bloodbank.entity.User;
import com.example.bloodbank.repository.DonorRepository;
import com.example.bloodbank.repository.UserRepository;
import com.example.bloodbank.service.DonorService;
import com.example.bloodbank.service.mapper.DonorMapper;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.Optional;
import java.util.UUID;

@Service
public class DonorServiceImpl implements DonorService {

    private final DonorRepository donorRepository;
    private final DonorMapper donorMapper;
    private final UserRepository userRepository;

    public DonorServiceImpl(DonorRepository donorRepository, DonorMapper donorMapper, UserRepository userRepository) {
        this.donorRepository = donorRepository;
        this.donorMapper = donorMapper;
        this.userRepository = userRepository;
    }

    @Override
    public DonorDTO saveDonor(DonorCreateDTO dto){
        Optional <User> existentUser = userRepository.findByUsername(dto.getUsername());
        if(existentUser.isPresent()){
            throw new InvalidParameterException("This username is taken.");
        }
        if(!dto.getPassword().equals(dto.getConfirmPassword())){
            throw new InvalidParameterException("Passwords do not match.");
        }
        Donor donor = donorMapper.toDonor(dto);
        this.donorRepository.save(donor);
        return donorMapper.toDTO(donor);
    }

    @Override
    public void updateDonor(DonorUpdateDTO dto) {
        Optional <User> existentUser = userRepository.findByUsername(dto.getUsername());
        if(existentUser.isPresent() && !dto.getId().equals(existentUser.get().getId())){
            throw new InvalidParameterException("This username is taken.");
        }
        if(!dto.getPassword().equals(dto.getConfirmPassword())){
            throw new InvalidParameterException("Passwords do not match.");
        }
        Donor donor = donorMapper.toDonor(dto);
        this.donorRepository.save(donor);
    }

    @Override
    public Donor findByID(UUID id) {
       Optional<Donor> donor= donorRepository.findById(id);
       if(donor.isPresent())
           return donor.get();
       else{
           throw  new InvalidParameterException("This donor does not exist!");
       }
    }

    @Override
    public void deleteDonorById(UUID id){
        this.donorRepository.deleteById(id);
    }
}
