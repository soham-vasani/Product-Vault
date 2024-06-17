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
import com.ProductMaster.service.loginService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Controller
public class loginController {
	
	@Autowired
	loginService ls;
	
	@Autowired
    private HttpSession session;
	
	
	@RequestMapping("/login")
	public String signUp() {
		session.invalidate();
		return "/product_master_jsp/index";
	}

	@PostMapping("/loginUser")
	@ResponseBody public String loginUser(@RequestBody signup loginData){
		
		String message = ls.loginUser(loginData);
		
		if(message == "success") {
			session.setAttribute("userEmail", loginData.getEmailId());
//			return "redirect:/category";
			return message;
		}else {
			return message;
		}
	}
}
