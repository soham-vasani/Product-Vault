package com.ProductMaster.service;
import com.ProductMaster.entity.category;

import java.util.List;
import java.util.Map;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

public interface categoryService {
    
    //insert/update if category not exist.
    String InsertUpdateCategory(category c);

    //select
    List<category> selectCategory();
    
    //select by id.
    category selectEachCategoryData(Integer cId);

    //delete(update active id = 9)
    boolean deleteCategory(Integer categoryId);

    List<Map<String, Object>> getExcelData(String findString);       
}
