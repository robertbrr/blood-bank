package com.example.bloodbank.configuration;

import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.service.AppointmentService;
import com.example.bloodbank.service.messagehandler.Message;
import com.example.bloodbank.service.messagehandler.messagefactory.MessageSenderFactory;
import com.example.bloodbank.service.messagehandler.messagesender.MessageSender;
import com.example.bloodbank.types.MessageType;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.util.List;

@Configuration
@EnableScheduling
public class ScheduledReminder {

    private Message reminderMessage;
    private final AppointmentService appointmentService;
    private final MessageSenderFactory messageSenderFactory;

    public ScheduledReminder(AppointmentService appointmentService, MessageSenderFactory messageSenderFactory) {
        this.appointmentService = appointmentService;
        this.messageSenderFactory = messageSenderFactory;
        this.reminderMessage = new Message(MessageType.REMINDER);
    }

    //every 24 hours
    //delay used only for debugging, so the task doesn't trigger
    //while adding new functionality to the app
    @Scheduled(fixedRate = 86400000, initialDelay = 500000)
    public void sendReminder() {
        //get the appointments for the day after
        List<Appointment> appointmentList = appointmentService.findByDate(LocalDate.now().plusDays(1));
        for (Appointment appointment : appointmentList) {
            //create message
            Message message = this.reminderMessage.clone();
            message.putInfo(appointment);

            //send message
            MessageSender messageSender = messageSenderFactory.create(appointment.getReminderType());
            messageSender.send(message);
        }
    }
}