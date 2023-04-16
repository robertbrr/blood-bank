package com.example.bloodbank.controller;

import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.service.DonationCenterService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class DonationCenterController {

    private final DonationCenterService donationCenterService;

    public DonationCenterController(DonationCenterService donationCenterService) {
        this.donationCenterService = donationCenterService;
    }

    @GetMapping("/donation-centers")
    ResponseEntity<List<DonationCenter>> getAllDonationCenters(){
        return ResponseEntity.ok(donationCenterService.findAll());
    }
}