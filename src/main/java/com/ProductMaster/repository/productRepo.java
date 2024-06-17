package com.ProductMaster.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ProductMaster.entity.product;

public interface productRepo extends JpaRepository<product,Integer>{
	
	@Query(value="select * from product where product_name = :productName and active_id != 9 and category_id = :categoryId and sub_category_id = :subCategoryId",nativeQuery=true)
	product productExist(@Param("productName")String productName,@Param("categoryId")Integer categoryId,@Param("subCategoryId")Integer subCategoryId);
	
//	@Query(value="select * from product where active_id != 9;",nativeQuery=true)
//	List<Object[]> findProduct();
	
	@Query(value="select product.product_image,product.product_id,product.active_id,product.product_name,product.product_description,product.product_price,product.product_discount,category.category_name from product join category on product.category_id = category.category_id where product.active_id != 9;",nativeQuery=true)
	List<Object[]> findProduct();
	
	@Query(value="select product_image from product where product_id = :pId",nativeQuery = true)
	String getImgUrl(@Param("pId")Integer pId);
}
