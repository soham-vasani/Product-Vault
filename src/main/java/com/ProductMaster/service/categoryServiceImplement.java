package com.ProductMaster.service;

import com.ProductMaster.entity.category;
import com.ProductMaster.repository.categoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class categoryServiceImplement implements categoryService {

	@Autowired
	private categoryRepo cRepo;

	@Override
	public String InsertUpdateCategory(category c) {

		int cId = c.getCategoryId();
		category ExistingCategory = cRepo.categoryExist(c.getCategoryName());

		if (cId == 0) {
			// inserting.
			if (ExistingCategory != null) {
				return "Category already exist.";
			} else {
				cRepo.save(c);
				return "Category Inserted.";
			}
		} else {			
			// updating.

			if (ExistingCategory != null) {
				int ExistingCategoryId = ExistingCategory.getCategoryId();

				if (ExistingCategoryId == cId) {
					cRepo.save(c);
					return "Category Updated.";
				} else {
					return "Category already exist.";
				}				
			}else {
				cRepo.save(c);
				return "Category Updated.";
			}			
		}		
	}

	/*
	 * @Override public List<category> selectCategory() { return (List<category>)
	 * cRepo.findAll(); }
	 */
	
	@Override
	public List<category> selectCategory() {
		
		//it return the array of category so we convert it into json with valid key.
		List<category> categoryDataArray = cRepo.findCategory();
		
//		List<Map<String,Object>> categoryDataJson = new ArrayList<>();
//		
//		for(Object[] result : categoryDataArray) {
//			Map<String,Object> map = new LinkedHashMap<>();
//			
//			map.put("category_id", result[0]);
//			map.put("active_id", result[1]);
//			map.put("category_description", result[2]);
//			map.put("category_name", result[3]);
//			
//			categoryDataJson.add(map);
//		}
//		
		return categoryDataArray;
	}

	@Override
	public category selectEachCategoryData(Integer cId) {
		Optional<category> existingCategory = cRepo.findById(cId);
		return existingCategory.orElse(null);
	}

	@Override
	public boolean deleteCategory(Integer categoryId) {

		category existingCategory = cRepo.findById(categoryId).orElse(null);

		if (existingCategory != null) {
			existingCategory.setActiveId(9);
			cRepo.save(existingCategory);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<Map<String,Object>> getExcelData(String findString) {
		
		List<category> categoryExcelData = cRepo.findExcelData(findString);
		
		List<Map<String,Object>> categoryDataJson = new ArrayList<>();
		
		for(category result : categoryExcelData) {
			
			Map<String,Object> map = new LinkedHashMap<>();
			
			map.put("categoryId", result.getCategoryId());
			map.put("categoryName", result.getCategoryName());
			map.put("categoryDescription", result.getCategoryDescription());
			
			categoryDataJson.add(map);
		}
		
		return categoryDataJson;

	}
}
