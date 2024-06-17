package com.ProductMaster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ProductMaster.entity.product;
import com.ProductMaster.service.productService;

import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
public class productController {

	@Autowired
	private productService ps;

	@RequestMapping("/product")
	public String showProduct(HttpSession session) {
		
    	if(session.getAttribute("userEmail") != null) {
    		return "/product_master_jsp/product_master";
    	}else {
    		return "redirect:/login";
    	}
		
	}

	@PostMapping("/insertAndUpdateProduct")
	@ResponseBody public String insertAndUpdateProduct(@RequestParam("productJson") String productJson,
			@RequestParam(name = "pImg", required = false) MultipartFile imgfile) {		
		return ps.insertAndUpdateProduct(productJson,imgfile);
	}
	
	@GetMapping("/selectAllProduct")
	 public @ResponseBody List<Map<String,Object>> selectAllProduct(){
		return ps.selectAllProduct();
	}

	
	@GetMapping("/selectProductById/{productId}")
	@ResponseBody product selectProductById(@PathVariable("productId") int productId) {
		return ps.selectProductById(productId);
	}
	
	
	@GetMapping("/deleteProduct/{productID}")
	@ResponseBody public Boolean deleteProduct(@PathVariable("productID") Integer productID) {
		return ps.deleteProduct(productID);
	}
	
	@GetMapping("/productExcel")
	@ResponseBody public String productExcel() {
		return ps.productExcel();
	}
	
}
