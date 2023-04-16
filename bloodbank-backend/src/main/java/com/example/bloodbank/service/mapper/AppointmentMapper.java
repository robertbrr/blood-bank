package com.example.bloodbank.service.mapper;

import com.example.bloodbank.dto.AppointmentCreateDTO;
import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.entity.Donor;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper {

    public Appointment toAppointment(AppointmentCreateDTO dto){
        Appointment appointment = new Appointment();
        appointment.setDate(dto.getDate());
        appointment.setStatus("PENDING");
        Donor donor = new Donor();
        donor.setId(dto.getDonorId());
        appointment.setDonor(donor);
        appointment.setDonationCenter(dto.getDonationCenter());
        return appointment;
    }
}
