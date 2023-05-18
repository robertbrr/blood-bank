package com.example.bloodbank.repository;

import com.example.bloodbank.entity.BloodReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BloodReportRepository extends JpaRepository<BloodReport,Long> {

    Optional<BloodReport> findByAppointment_Id(Long id);

    long deleteByDoctor_Id(UUID id);

    long deleteByAppointment_Id(Long id);

    long deleteByAppointment_Donor_Id(UUID id);

}
