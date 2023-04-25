package com.example.bloodbank.service;

import com.example.bloodbank.dto.AppointmentCreateDTO;
import com.example.bloodbank.entity.Appointment;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface AppointmentService {

    void saveAppointment(AppointmentCreateDTO dto);

    void deleteById(Long id,LocalDate date);

    List<Appointment> findByDonationCenter_Id(Long id, Integer pageNo, Integer pageSize);

    List<Appointment> findByDonationCenter_IdAndDate(Long id, LocalDate date);

    List<Appointment> findByDonorId(UUID id);

    long countAppointmentsByDonationCenter_Id(Long id);

    void deleteByDonorId(UUID id);

    void confirm(long id);

    List<LocalDate> getInvalidDates(Long donationCenterId, Integer maxDonationsPerDay, LocalDate dateLimit);
}
