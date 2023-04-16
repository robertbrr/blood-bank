package com.example.bloodbank.service.impl;


import com.example.bloodbank.entity.DonationCenter;
import com.example.bloodbank.repository.DonationCenterRepository;
import com.example.bloodbank.service.DonationCenterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationCenterServiceImpl implements DonationCenterService {

    private final DonationCenterRepository donationCenterRepository;

    public DonationCenterServiceImpl(DonationCenterRepository donationCenterRepository) {
        this.donationCenterRepository = donationCenterRepository;
    }

    @Override
    public List<DonationCenter> findAll() {
        return this.donationCenterRepository.findAll();
    }
}
