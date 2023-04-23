package com.example.bloodbank.controller;

import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.service.AppointmentService;
import com.example.bloodbank.service.DonationCenterService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class DonationCenterController {

    private final DonationCenterService donationCenterService;
    private final AppointmentService appointmentService;

    public DonationCenterController(DonationCenterService donationCenterService, AppointmentService appointmentService) {
        this.donationCenterService = donationCenterService;
        this.appointmentService = appointmentService;
    }

    @GetMapping("/donation-centers")
    ResponseEntity<List<DonationCenter>> getAllDonationCenters(){
        return ResponseEntity.ok(donationCenterService.findAll());
    }

    @GetMapping("donation-centers/{id}/full-days")
    ResponseEntity<List<LocalDate>> findFullDays(@PathVariable("id") long id,
                                                 @RequestParam("maxDonationsPerDay") Integer maxDonationsPerDay,
                                                 @RequestParam("dateLimit") LocalDate dateLimit){
        List<LocalDate> daysFull = appointmentService.getInvalidDates(id,maxDonationsPerDay,dateLimit);
        return ResponseEntity.ok(daysFull);
    }
}