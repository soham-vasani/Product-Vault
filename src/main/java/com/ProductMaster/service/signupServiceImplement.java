package com.ProductMaster.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ProductMaster.entity.signup;
import com.ProductMaster.repository.signupRepo;

@Service
public class signupServiceImplement implements signupService{
	
	
	@Autowired
	signupRepo sr;

	@Override
	public String addNewUser(signup signupData) {
		
		
		System.out.println(signupData.getEmailId());
		
//		signup ExisitingUser = sr.findById(signupData.getEmailId()).orElseThrow(
//				() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"user already exist.")
//				);
		signup ExisitingUser = sr.findById(signupData.getEmailId()).orElse(null);
		if(ExisitingUser != null) {
			return "user already exist.";
		}else {
			sr.save(signupData);
			return "user created.";
		}
		
	}

	

}
