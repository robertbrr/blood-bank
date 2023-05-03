package com.example.bloodbank.service.impl;


import com.example.bloodbank.dto.AppointmentCreateDTO;
import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.repository.AppointmentRepository;
import com.example.bloodbank.service.AppointmentService;
import com.example.bloodbank.service.mapper.AppointmentMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.security.InvalidParameterException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AppointmentMapper appointmentMapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository, AppointmentMapper appointmentMapper) {
        this.appointmentRepository = appointmentRepository;
        this.appointmentMapper = appointmentMapper;
    }

    @Override
    public Appointment saveAppointment(AppointmentCreateDTO dto){
       if(dto.getDate().isBefore(LocalDate.now())){
           throw new InvalidParameterException("Can't schedule in the past!");
       }
       if (dto.getDate().getDayOfWeek().equals(DayOfWeek.SATURDAY)||
               dto.getDate().getDayOfWeek().equals(DayOfWeek.SUNDAY)){
           throw new InvalidParameterException("Can't schedule on weekends!");
       }
       long appointmentsOnDate = appointmentRepository
               .countByDonationCenter_IdAndDate(dto.getDonationCenter().getId(),dto.getDate());
       if(appointmentsOnDate>=dto.getDonationCenter().getMaxDonationsPerDay())
           throw new InvalidParameterException("The selected day is full!");
       Appointment appointment = appointmentMapper.toAppointment(dto);
       return this.appointmentRepository.save(appointment);
    }

    @Override
    public void deleteById(Long id,LocalDate date){
        //not sure if the requirements meant "delete appointments scheduled for today and tomorrow"
        //or "for today and all future days" (I chose this one)
        if(date.isBefore(LocalDate.now())) {
            throw new InvalidParameterException("Can't delete appointments in the past!");
        }else{
            this.appointmentRepository.deleteById(id);
        }
    }

    @Override
    public Page<Appointment> findByDonationCenter_Id(Long id, Integer pageNo, Integer pageSize){
        return appointmentRepository.findByDonationCenter_Id(id, PageRequest.of(pageNo,pageSize, Sort.by("date").descending()));
    }

    @Override
    public List<Appointment> findByDonationCenter_IdAndDate(Long id, LocalDate date) {
        return appointmentRepository.findByDonationCenter_IdAndDate(id,date);
    }

    @Override
    public List<Appointment> findByDonorId(UUID id){
        return this.appointmentRepository.findByDonor_Id(id);
    }


    @Override
    public void deleteByDonorId(UUID id){
        this.appointmentRepository.deleteByDonor_Id(id);
    }

    @Override
    public void confirm(long id) {
        Optional<Appointment> appointment = this.appointmentRepository.findById(id);
        if(appointment.isEmpty()) throw new InvalidParameterException("Appointment not found!");
        appointment.get().setStatus("CONFIRMED");
        appointmentRepository.save(appointment.get());
    }

    @Override
    public List<LocalDate> getInvalidDates(Long donationCenterId, Integer maxDonationsPerDay, LocalDate dateLimit) {
        //date from today to date limit (inclusive)
        List<LocalDate> datesFull = new ArrayList<>();
        for(LocalDate date = LocalDate.now(); !date.isAfter(dateLimit); date=date.plusDays(1)){
            long count = appointmentRepository.countByDonationCenter_IdAndDate(donationCenterId,date);
            if(count >= maxDonationsPerDay){
                datesFull.add(date);
            }
        }
       return datesFull;
    }

    @Override
    public List<Appointment> findByDate(LocalDate date) {
        return this.appointmentRepository.findByDate(date);
    }
}
