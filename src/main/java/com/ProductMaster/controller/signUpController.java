package com.ProductMaster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ProductMaster.entity.signup;
import com.ProductMaster.service.signupService;

@Controller
public class signUpController {
	
	@Autowired
	signupService sus;
	
	@RequestMapping("/signup")
	public String signUp() {
		return "/product_master_jsp/signup";
	}
	
	@PostMapping("/addUser")
	@ResponseBody public ResponseEntity<String> addUser(@RequestBody signup signupData) {
		
		return new ResponseEntity<>(sus.addNewUser(signupData),HttpStatus.OK);
	}
	
	
}
