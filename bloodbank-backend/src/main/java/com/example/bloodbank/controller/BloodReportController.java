package com.example.bloodbank.controller;

import com.example.bloodbank.entity.BloodReport;
import com.example.bloodbank.service.BloodReportService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;

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

    @GetMapping("blood-reports/{id}")
    ResponseEntity<?> getBloodReportByAppointmentId(@PathVariable("id") Long id){
        try{
            BloodReport bloodReport = bloodReportService.getBloodReportByAppointmentId(id);
            return ResponseEntity.ok(bloodReport);
        }catch (InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}