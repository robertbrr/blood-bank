package com.example.bloodbank.controller;

import com.example.bloodbank.dto.DonorCreateDTO;
import com.example.bloodbank.dto.DonorDTO;
import com.example.bloodbank.dto.DonorUpdateDTO;
import com.example.bloodbank.entity.Donor;
import com.example.bloodbank.service.AppointmentService;
import com.example.bloodbank.service.DonorService;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class DonorController {

    private final DonorService donorService;
    private final AppointmentService appointmentService;

    public DonorController(DonorService donorService, AppointmentService appointmentService) {
        this.donorService = donorService;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/donors/{id}")
    ResponseEntity<?> getDonor(@PathVariable("id") UUID id){
        try{
            Donor donor = this.donorService.findByID(id);
            return ResponseEntity.ok(donor);
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/donors")
    ResponseEntity<?> addNewDonor(@RequestBody DonorCreateDTO dto){
        try {
            DonorDTO registeredDonor = donorService.saveDonor(dto);
            return ResponseEntity.ok(registeredDonor);
        } catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/donors")
    ResponseEntity<?> updateDonor(@RequestBody DonorUpdateDTO dto){
        try {
            donorService.updateDonor(dto);
            return ResponseEntity.ok("Successfully updated!");
        } catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Transactional
    @DeleteMapping("/donors/{id}")
    ResponseEntity<String> deleteDonor(@PathVariable("id") UUID id){
        this.appointmentService.deleteByDonorId(id);
        this.donorService.deleteDonorById(id);
        return ResponseEntity.ok().body("Successfully deleted!");
    }
}