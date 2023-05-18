package com.example.bloodbank.service.impl;

import com.example.bloodbank.dto.DoctorCreateDTO;
import com.example.bloodbank.entity.Doctor;

import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.entity.User;
import com.example.bloodbank.repository.BloodReportRepository;
import com.example.bloodbank.repository.DoctorRepository;
import com.example.bloodbank.repository.UserRepository;
import com.example.bloodbank.service.DoctorService;
import com.example.bloodbank.service.mapper.DoctorMapper;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final BloodReportRepository bloodReportRepository;
    private final DoctorMapper doctorMapper;

    public DoctorServiceImpl(DoctorRepository doctorRepository, UserRepository userRepository, BloodReportRepository bloodReportRepository, DoctorMapper doctorMapper) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.bloodReportRepository = bloodReportRepository;
        this.doctorMapper = doctorMapper;
    }

    public List<Doctor> findAll(){
        return this.doctorRepository.findAll();
    }

    @Override
    public DonationCenter findDoctorDonationCenter(UUID id) {
        return this.findById(id).getDonationCenter();
    }

    @Override
    public Doctor findById(UUID id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if(doctor.isPresent()) return doctor.get();
        else{
            throw new InvalidParameterException("Doctor does not exist!");
        }
    }

    @Override
    public void updateDoctor(Doctor doctor){
        Optional <User> existentUser = userRepository.findByUsername(doctor.getUsername());
        if(existentUser.isPresent() && doctor.getId()!=null && !doctor.getId().equals(existentUser.get().getId())) {
            throw new InvalidParameterException("This username is taken.");
        }
        this.doctorRepository.save(doctor);
    }

    @Override
    public void saveDoctor(DoctorCreateDTO dto) {
        Optional <User> existentUser = userRepository.findByUsername(dto.getUsername());
        if(existentUser.isPresent()){
            throw new InvalidParameterException("This username is taken.");
        }
        this.doctorRepository.save(doctorMapper.toDoctor(dto));
    }

    @Override
    public void deleteDoctorById(UUID id) {
        this.bloodReportRepository.deleteByDoctor_Id(id);
        this.doctorRepository.deleteById(id);
    }
}
