package com.ProductMaster.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.stereotype.Service;

import com.ProductMaster.entity.signup;
import com.ProductMaster.repository.signupRepo;

import jakarta.servlet.http.HttpSession;

@Service
public class loginServiceImplementation implements loginService{
	
	@Autowired
	signupRepo sr;


	@Override
	public String loginUser(signup loginData) {
		
		System.out.println(loginData.getEmailId()+loginData.getPassword());
		
		signup existUser = sr.loginUserExist(loginData.getEmailId(),loginData.getPassword());
		
		if(existUser != null) {
			return "success";
		}else {
			return "fail";
		}
		
	}
}
