package com.ProductMaster.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ProductMaster.entity.subCategory;
import com.ProductMaster.repository.subCategoryRepo;

@Service
public class subCategoryServiceImplement implements subCategoryService {

	@Autowired
	subCategoryRepo scRepo;

	@Override
	public String InsertUpdateSubCategory(subCategory sc) {

		int subCategoryId = sc.getSubCategoryId();
		subCategory existingSubCategory = scRepo.subCategoryExist(sc.getCategoryId(),sc.getSubCategoryName());

		if (subCategoryId == 0) {
			if (existingSubCategory != null) {
				return "sub category already exist.";
			} else {
				scRepo.save(sc);
				return "sub category inserted.";
			}
		} else {
			if (existingSubCategory != null) {
				int existingSubCategoryId = existingSubCategory.getSubCategoryId();

				if (existingSubCategoryId == subCategoryId) {
					scRepo.save(sc);
					return "sub category updated.";
				} else {
					return "sub category already exist.";
				}
			} else {
				scRepo.save(sc);
				return "sub category updated.";
			}
		}
	}

	@Override
	public List<Map<String, Object>> selectSubCategoryData() {

		// return this type of obj[[],[],[]]
		List<Object[]> RowResultData = scRepo.findAllSubCategoryAndCategory();
		List<Map<String, Object>> data = new ArrayList<>();

		for (Object[] result : RowResultData) {

			Map<String, Object> map = new LinkedHashMap<>();

			map.put("category_id", result[0]);
			map.put("active_id", result[1]);
			map.put("sub_category_id", result[2]);
			map.put("sub_category_name", result[3]);
			map.put("sub_category_description", result[4]);
			map.put("category_name", result[5]);

			data.add(map);
		}

		// return this type of obj[{},{},{}]
		return data;
	}

	@Override
	public Boolean deleteSubCategory(Integer subCategoryId) {
		subCategory existingSubCategory = scRepo.findById(subCategoryId).orElse(null);
		
		if (existingSubCategory != null) {
			existingSubCategory.setActiveId(9);
			scRepo.save(existingSubCategory);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public subCategory selectEachSubCategoryData(Integer subCategoryId) {
		Optional<subCategory> ExistingSubCategory = scRepo.findById(subCategoryId);
		return ExistingSubCategory.orElse(null);
	}

	@Override
	public List<Map<String,Object>> getSubCategoryByCId(Integer categoryId) {
		List<Object[]> subCategoryNameObj = scRepo.getSubCategoryByCId(categoryId);//[[3,"Boing"],[3,"Boing"]]
		List<Map<String,Object>> subCategoryNameJson = new ArrayList<>();//{{scId:3,scName:"Boing"},{scId:3,scName:"Boing"}}
		
		for(Object[] result:subCategoryNameObj) {
			
			Map<String,Object> map = new LinkedHashMap<>();
			
			map.put("subCategoryId",result[0]);
			map.put("subCategoryName",result[1]);
			
			subCategoryNameJson.add(map);
		}
		return subCategoryNameJson;
	}

	@Override
	public List<Map<String, Object>> getSubCategoryDataForExcel(String findString) {	

		List<Object[]> excelDataObj = scRepo.findSubCategoryExcelData(findString);

		List<Map<String,Object>> excelDataJson = new ArrayList<>();

		for(Object[] result:excelDataObj) {
			
			Map<String,Object> map = new LinkedHashMap<>();
			
			map.put("categoryId",result[0]);
			map.put("activeId",result[1]);
			map.put("subCategoryId",result[2]);
			map.put("subCategoryName",result[3]);
			map.put("subCategoryDescription",result[4]);
			map.put("categoryName",result[5]);
			
			excelDataJson.add(map);
		}

		return excelDataJson;
	}

}
