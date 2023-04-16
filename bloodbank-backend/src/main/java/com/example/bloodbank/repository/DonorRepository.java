package com.example.bloodbank.repository;

import com.example.bloodbank.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DonorRepository extends JpaRepository<Donor,Long> {

    Optional<Donor> findById(UUID id);
    void deleteById(UUID id);
}
