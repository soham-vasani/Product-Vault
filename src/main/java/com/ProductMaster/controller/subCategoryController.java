package com.ProductMaster.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ProductMaster.service.subCategoryService;

import jakarta.servlet.http.HttpSession;

import com.ProductMaster.entity.subCategory;

@Controller
public class subCategoryController {
	
	@Autowired
	private subCategoryService scs;
	
	@RequestMapping("subCategory")
	public String subCategory(HttpSession session) {
		
    	if(session.getAttribute("userEmail") != null) {
    		return "product_master_jsp/sub_category_master";
    	}else {
    		return "redirect:/login";
    	}
	}

	@PostMapping("/InsertUpdateSubCategory")
	@ResponseBody public String InsertUpdateSubCategory(@RequestBody subCategory sc) {
		return scs.InsertUpdateSubCategory(sc);
	}
	
	@GetMapping("/selectSubCategoryData")
	public @ResponseBody List<Map<String, Object>> selectSubCategoryData() {
		return scs.selectSubCategoryData();
	}
	
	@GetMapping("/selectEachSubCategoryData/{scId}")
	public @ResponseBody subCategory selectEachSubCategoryData(@PathVariable(name="scId") Integer subCategoryId) {
		return scs.selectEachSubCategoryData(subCategoryId);
	}
	
	@GetMapping("/deleteSubCategory/{subCategoryId}")
	public @ResponseBody Boolean deleteSubCategory(@PathVariable(name="subCategoryId")Integer  subCategoryId) {
		return scs.deleteSubCategory(subCategoryId);
	}
	
	@GetMapping("/getSubcategory/{cId}")
	public @ResponseBody List<Map<String,Object>> getSubCategoryByCId(@PathVariable(name="cId") Integer categoryId) {
		return scs.getSubCategoryByCId(categoryId);
	}

	@GetMapping("/getSubCategoryDataForExcel")
	public @ResponseBody List<Map<String,Object>> getSubCategoryDataForExcel(@RequestBody @RequestParam("findStr") String findString) {
		return scs.getSubCategoryDataForExcel(findString);
	}
	
}
