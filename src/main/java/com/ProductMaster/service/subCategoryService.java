package com.ProductMaster.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ProductMaster.entity.subCategory;

public interface subCategoryService {
	
	String InsertUpdateSubCategory(subCategory sc);
	
	List<Map<String, Object>> selectSubCategoryData();
	
	Boolean deleteSubCategory(Integer  subCategoryId);
	
	subCategory selectEachSubCategoryData(Integer subCategoryId);
	
	List<Map<String,Object>> getSubCategoryByCId(Integer categoryId);

	List<Map<String,Object>> getSubCategoryDataForExcel(String findString);
}