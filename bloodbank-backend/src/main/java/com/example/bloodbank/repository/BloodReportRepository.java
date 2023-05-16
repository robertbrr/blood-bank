package com.example.bloodbank.repository;

import com.example.bloodbank.entity.BloodReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BloodReportRepository extends JpaRepository<BloodReport,Long> {
}
