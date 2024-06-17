package com.ProductMaster.controller;

import com.ProductMaster.entity.category;

import com.ProductMaster.service.categoryService;

import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class categoryController {

    @Autowired
    private categoryService cs;


    @RequestMapping("/category")
    public String showCategory(HttpSession session){
    	
    	if(session.getAttribute("userEmail") != null) {
    		return "/product_master_jsp/category_master";
    	}else {
    		return "redirect:/login";
    	}
        
    }
           
    @PostMapping("/InsertUpdateCategory")
    @ResponseBody public String InsertUpdateCategory(@Validated @RequestBody category c) {
    	return cs.InsertUpdateCategory(c);
    }
    
    @GetMapping("/select")
    public @ResponseBody List<category> selectCategory() {
        return cs.selectCategory();
    }
    
    @GetMapping("/selectEachCategoryData/{cId}")
    public @ResponseBody category selectEachCategoryData(@PathVariable("cId") Integer cId) {
		return cs.selectEachCategoryData(cId);
    }
    
    @GetMapping("/delete/{cId}")
    public @ResponseBody boolean deleteCategory(@PathVariable("cId") Integer categoryId) {
    	return cs.deleteCategory(categoryId);
    }
    
    @GetMapping("/getExcelData")
    public @ResponseBody List<Map<String,Object>> getExcelData(@RequestBody @RequestParam("findStr") String findString) {
		return cs.getExcelData(findString);
    }
    
}
