package com.example.bloodbank.controller;

import com.example.bloodbank.dto.DoctorCreateDTO;
import com.example.bloodbank.entity.Doctor;
import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.service.DoctorService;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/doctors")
    ResponseEntity<List<Doctor>> getAllDoctors(){
        return ResponseEntity.ok(doctorService.findAll());
    }

    @GetMapping("/doctors/{id}")
    ResponseEntity<?> getDoctor(@PathVariable("id") UUID id){
        try{
            Doctor doctor = doctorService.findById(id);
            return ResponseEntity.ok(doctor);
        }catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("doctors/{id}/donation-center")
    ResponseEntity<?> getDoctorDonationCenter(@PathVariable("id") UUID id){
        try{
            DonationCenter center = doctorService.findDoctorDonationCenter(id);
            if(center == null)
                return ResponseEntity.badRequest().body("This doctor has no center assigned!?");
            return ResponseEntity.ok(center);
        }catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("doctors")
    ResponseEntity<String> updateDoctor(@RequestBody Doctor doctor){
        try{
            this.doctorService.updateDoctor(doctor);
            return ResponseEntity.ok().body("Success!");
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("doctors")
    ResponseEntity<String> saveDoctor(@RequestBody DoctorCreateDTO dto){
        try{
            this.doctorService.saveDoctor(dto);
            return ResponseEntity.ok().body("Success!");
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("doctors/{id}")
    ResponseEntity<String> deleteDoctor(@PathVariable("id") UUID id){
        this.doctorService.deleteDoctorById(id);
        return ResponseEntity.ok().body("Success!");
    }
}