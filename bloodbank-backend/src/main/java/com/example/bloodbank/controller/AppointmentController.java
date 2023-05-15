package com.example.bloodbank.controller;

import com.example.bloodbank.dto.AppointmentCreateDTO;
import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.service.AppointmentService;

import com.example.bloodbank.service.DonorService;
import com.example.bloodbank.service.messagehandler.Message;
import com.example.bloodbank.service.messagehandler.messagefactory.MessageSenderFactory;
import com.example.bloodbank.service.messagehandler.messagesender.MessageSender;
import com.example.bloodbank.types.MessageType;
import org.springframework.data.domain.Page;
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
    private final DonorService donorService;
    private final MessageSenderFactory messageSenderFactory;
    private final Message confirmMessage;
    private static final Long DURATION_BETWEEN_APPOINTMENTS = 6L;

    public AppointmentController(AppointmentService appointmentService, DonorService donorService, MessageSenderFactory messageSenderFactory) {
        this.appointmentService = appointmentService;
        this.donorService = donorService;
        this.messageSenderFactory = messageSenderFactory;
        this.confirmMessage = new Message(MessageType.CONFIRMATION);
    }

    //not sure if these mapping namings are adequate (lmk if I should rename these)
    //one has appointments because we don't care who schedules it when saving
    //because we send the whole appointment dto
    @PostMapping("appointments")
    ResponseEntity<String> saveAppointment(@RequestBody AppointmentCreateDTO dto){
        try{
            //save appointment and return
            Appointment appointment = this.appointmentService.saveAppointment(dto);
            appointment.setDonor(this.donorService.findByID(dto.getDonorId()));

            //create message
            Message message = this.confirmMessage.clone();
            message.putInfo(appointment);

            //send message
            //this actually works I promise (I tested it)
            //MessageSender messageSender = messageSenderFactory.create(appointment.getReminderType());
            //messageSender.send(message);

            return ResponseEntity.ok().body("Success!");
        }catch(InvalidParameterException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //other one is mapped to donors/id/appointments because
    //we get them based on the donor id
    @GetMapping("donors/{id}/appointments")
    ResponseEntity<List<Appointment>> getAppointmentsByDonorId(@PathVariable("id") UUID id,
                                                               @RequestParam("canScheduleCheck") Boolean canScheduleCheck){
        if(canScheduleCheck == null || !canScheduleCheck) {
            return ResponseEntity.ok(appointmentService.findByDonorId(id));
        }else
            return ResponseEntity.ok(appointmentService.findByDonor_IdAndDateAfter(id,LocalDate.now().minusMonths(DURATION_BETWEEN_APPOINTMENTS)));
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
    ResponseEntity<Page<Appointment>> findAppointmentsByCenter(@PathVariable("id") long id,
                                                               @RequestParam("pageNo") int pageNo,
                                                               @RequestParam("pageSize")int pageSize){
        Page<Appointment> appointments = appointmentService.findByDonationCenter_Id(id,pageNo,pageSize);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("donation-centers/{id}/appointments-today")
    ResponseEntity<List<Appointment>> findAppointmentsByCenterToday(@PathVariable("id") long id){
        List<Appointment> appointments=appointmentService.findByDonationCenter_IdAndDate(id,LocalDate.now());
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("appointments/{id}/confirm")
    ResponseEntity<String> confirmAppointment(@PathVariable long id){
        appointmentService.confirm(id);
        return ResponseEntity.ok("Appointment confirmed!");
    }

}