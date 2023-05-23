package com.example.bloodbank.service.messagehandler;

import com.example.bloodbank.entity.Appointment;
import com.example.bloodbank.types.MessageType;
import com.example.bloodbank.types.ReminderType;

public class Message implements Cloneable{
    private String subject;
    private String text;
    private String recipient;
    private MessageType messageType;

    public Message(MessageType messageType) {
        if(messageType.equals(MessageType.REMINDER)){
            this.subject = "Appointment Reminder";
        }else if (messageType.equals(MessageType.CONFIRMATION)){
            this.subject="Appointment Confirmation";
        }
        this.messageType = messageType;
        StringBuilder stringBuilder= new StringBuilder();
        this.text = stringBuilder
                .append("Hello, &!\n\n")
                .append("This is an automated message & ")
                .append("your scheduled appointment at &, &, on &.\n\n")
                .append("BloodBank Team").toString();
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public void putInfo(Appointment appointment){

        //put user data
        text = text.replaceFirst("&",appointment.getDonor().getFirstName() +" " + appointment.getDonor().getLastName());
        if(this.messageType.equals(MessageType.CONFIRMATION)){
            text = text.replaceFirst("&","confirming");
        }else{//if(this.messageType.equals(MessageType.REMINDER))
            text = text.replaceFirst("&", "reminding you about");
        }
        text = text.replaceFirst("&", appointment.getDonationCenter().getName());
        text = text.replaceFirst("&", appointment.getDonationCenter().getAddress());
        text = text.replaceFirst("&", appointment.getDate().toString());

        //set recipient
        if(appointment.getReminderType().equals(ReminderType.SMS)){
            this.recipient = appointment.getDonor().getPhoneNumber();
        }else if(appointment.getReminderType().equals(ReminderType.EMAIL)){
            this.recipient = appointment.getDonor().getEmail();
        }
    }

    public Message clone(){
        Message clone = null;
        try {
            clone = (Message) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return clone;
    }
}
