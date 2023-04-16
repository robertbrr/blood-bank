package com.example.bloodbank.dto;

public class DoctorCreateDTO {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String cnp;
    private long donationCenterId;

    public long getDonationCenterId() {
        return donationCenterId;
    }

    public void setDonationCenterId(long donationCenterId) {
        this.donationCenterId = donationCenterId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCnp() {
        return cnp;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }
}
