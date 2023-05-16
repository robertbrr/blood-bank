package com.example.bloodbank.controller;

import com.example.bloodbank.dto.DonorCreateDTO;
import com.example.bloodbank.dto.DonorDTO;
import com.example.bloodbank.entity.BloodReport;
import com.example.bloodbank.entity.Donor;
import com.example.bloodbank.service.BloodReportService;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class BloodReportController {

    private final BloodReportService bloodReportService;

    public BloodReportController(BloodReportService bloodReportService) {
        this.bloodReportService = bloodReportService;
    }

    @PostMapping("/blood-reports")
    ResponseEntity<String> addBloodReport(@RequestBody BloodReport bloodReport) {
        bloodReportService.saveBloodReport(bloodReport);
        return ResponseEntity.ok("Success!");
    }
}