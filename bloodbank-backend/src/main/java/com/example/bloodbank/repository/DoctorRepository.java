package com.example.bloodbank.repository;

import com.example.bloodbank.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {

    Optional<Doctor> findById(UUID id);

    void deleteById(UUID id);
}
