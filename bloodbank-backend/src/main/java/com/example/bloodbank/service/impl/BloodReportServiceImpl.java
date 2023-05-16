package com.example.bloodbank.service.impl;

import com.example.bloodbank.entity.BloodReport;
import com.example.bloodbank.repository.BloodReportRepository;
import com.example.bloodbank.service.BloodReportService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class BloodReportServiceImpl implements BloodReportService {
    private final BloodReportRepository bloodReportRepository;

    public BloodReportServiceImpl(BloodReportRepository bloodReportRepository) {
        this.bloodReportRepository = bloodReportRepository;
    }

    @Override
    public void saveBloodReport(BloodReport bloodReport) {
        this.bloodReportRepository.save(bloodReport);
    }
}
