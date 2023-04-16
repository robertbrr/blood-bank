package com.example.bloodbank.dto;

import java.util.UUID;

public class UserDTO {

    private String role;
    private UUID uuid;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }
}
