package com.ProductMaster.repository;
import com.ProductMaster.entity.*;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface categoryRepo extends JpaRepository<category,Integer> {
	
	@Query(value="select * from category where active_id != 9 and category_name = :categoryName",nativeQuery = true)
	category categoryExist(@Param("categoryName")String categoryName);	
	
	@Query(value="select * from category where active_id != 9;",nativeQuery = true)
	List<category> findCategory();
	
	@Query(value="select * from category where (category_id LIKE %:findString% or category_name LIKE %:findString% or category_description LIKE %:findString%) AND active_id != 9",nativeQuery=true)
	List<category> findExcelData(@Param("findString") String findString);
	
}
