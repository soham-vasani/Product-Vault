package com.ProductMaster.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ProductMaster.entity.category;
import com.ProductMaster.entity.subCategory;

@Repository
public interface subCategoryRepo extends JpaRepository<subCategory,Integer>{
	@Query(value = "SELECT * FROM sub_category WHERE sub_category_name = :subCategoryName AND active_id != 9 AND category_id = :categoryId", nativeQuery = true)
	subCategory subCategoryExist(@Param("categoryId") Integer categoryId,@Param("subCategoryName")String subCategoryName);
	
	@Query(value="SELECT sub_category.category_id,sub_category.active_id,sub_category.sub_category_id,sub_category.sub_category_name,sub_category.sub_category_description,category.category_name FROM sub_category LEFT JOIN category ON sub_category.category_id = category.category_id where sub_category.active_id = 0 OR sub_category.active_id = 1;",nativeQuery = true)
	List<Object[]> findAllSubCategoryAndCategory();
	
	@Query(value="SELECT sub_category_id,sub_category_name from sub_category where category_id = :categoryId AND active_id=1",nativeQuery=true)
	List<Object[]> getSubCategoryByCId(@Param("categoryId") Integer categoryId);

	@Query(value="\n" + //
				"select sub_category.category_id,sub_category.active_id,sub_category.sub_category_id,sub_category.sub_category_name,sub_category.sub_category_description,category.category_name from sub_category LEFT JOIN category ON sub_category.category_id = category.category_id where (sub_category.category_id LIKE %:findString% or sub_category.sub_category_id LIKE %:findString% or sub_category.sub_category_name LIKE %:findString% or sub_category.sub_category_description LIKE %:findString% or category.category_name LIKE %:findString%) AND sub_category.sub_category_id != 9 AND sub_category.category_id != 9;",nativeQuery=true)
	List<Object[]> findSubCategoryExcelData(@Param("findString") String findString);
	
}

