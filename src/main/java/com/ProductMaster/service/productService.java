package com.ProductMaster.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import com.ProductMaster.entity.product;

public interface productService {
	
	String insertAndUpdateProduct(String productJson, MultipartFile imgfile);
	
	List<Map<String,Object>> selectAllProduct();
	
	Boolean deleteProduct(Integer productID); 
	
	product selectProductById(int productId);

	String productExcel();
}
