package com.example.bloodbank.controller;

import com.example.bloodbank.dto.AppointmentCreateDTO;
import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.service.AppointmentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("v1/")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    //not sure if these mapping namings are adequate (lmk if I should rename these)
    //one has appointments because we don't care who schedules it when saving
    //because we send the whole appointment dto
    @PostMapping("appointments")
    ResponseEntity<String> saveAppointment(@RequestBody AppointmentCreateDTO dto){
        try{
            this.appointmentService.saveAppointment(dto);
            return ResponseEntity.ok().body("Success!");
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //other one is mapped to donors/id/appointments because
    //we get them based on the donor id
    @GetMapping("donors/{id}/appointments")
    ResponseEntity<List<Appointment>> getAppointmentsByDonorId(@PathVariable("id") UUID id){
        return ResponseEntity.ok(appointmentService.findByDonorId(id));
    }

    @DeleteMapping("donors/{id}/appointments")
    ResponseEntity<String> deleteAppointmentsByDonorId(@PathVariable("id") UUID id){
        appointmentService.deleteByDonorId(id);
        return ResponseEntity.ok().body("Success!");
    }

    // @Transactional
    // error if the appointment is not deleted when using @Transactional
    // does @Transactional require the delete operation to be mandatory?
    @DeleteMapping("appointments/{id}")
    ResponseEntity<String> deleteAppointment(@PathVariable("id") long id, @RequestBody LocalDate date){
        try{
            appointmentService.deleteById(id, date);
            return ResponseEntity.ok("Successfully deleted appointment!");
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("donation-centers/{id}/appointments")
    ResponseEntity<List<Appointment>> findAppointmentsByCenter(@PathVariable("id") long id){
        return ResponseEntity.ok(appointmentService.findByDonationCenter_Id(id));
    }

    @PutMapping("appointments/{id}/confirm")
    ResponseEntity<String> confirmAppointment(@PathVariable long id){
        appointmentService.confirm(id);
        return ResponseEntity.ok("Appointment confirmed!");
    }

}