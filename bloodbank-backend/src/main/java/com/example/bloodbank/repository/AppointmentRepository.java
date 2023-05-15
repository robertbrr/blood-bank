package com.example.bloodbank.repository;

import com.example.bloodbank.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    long countByDonationCenter_IdAndDate(Long id, LocalDate date);

    Page<Appointment> findByDonationCenter_Id(Long id, Pageable pageable);

    List<Appointment> findByDonationCenter_IdAndDate(Long id, LocalDate date);

    List<Appointment> findByDonor_Id(UUID id);

    void deleteByDonor_Id(UUID id);

    List<Appointment> findByDate(LocalDate date);

    List<Appointment> findByDonor_IdAndDateAfter(UUID id, LocalDate date);


}
