package com.example.bloodbank.dto;

import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.types.ReminderType;

import java.time.LocalDate;
import java.util.UUID;

public class AppointmentCreateDTO {

    private DonationCenter donationCenter;
    private UUID donorId;
    private LocalDate date;
    private ReminderType reminderType;

    public DonationCenter getDonationCenter() {
        return donationCenter;
    }

    public void setDonationCenter(DonationCenter donationCenter) {
        this.donationCenter = donationCenter;
    }

    public UUID getDonorId() {
        return donorId;
    }

    public void setDonorId(UUID donorId) {
        this.donorId = donorId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public ReminderType getReminderType() {
        return reminderType;
    }

    public void setReminderType(ReminderType reminderType) {
        this.reminderType = reminderType;
    }
}
