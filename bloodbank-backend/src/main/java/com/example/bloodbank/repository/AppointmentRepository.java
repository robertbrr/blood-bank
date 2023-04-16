package com.example.bloodbank.repository;

import com.example.bloodbank.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    long countByDonationCenter_IdAndDate(Long id, LocalDate date);

    List<Appointment> findByDonationCenter_Id(Long id);

    List<Appointment> findByDonor_Id(UUID id);

    void deleteByDonor_Id(UUID id);

}
