package com.example.bloodbank.service;

import com.example.bloodbank.entity.BloodReport;

import java.util.UUID;

public interface BloodReportService {

    void saveBloodReport(BloodReport bloodReport);

    BloodReport getBloodReportByAppointmentId(Long id);

}
