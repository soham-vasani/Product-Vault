package com.ProductMaster.service;

import java.awt.PageAttributes.MediaType;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ProductMaster.entity.product;
import com.ProductMaster.repository.productRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class productServiceImplementation implements productService {

	@Autowired
	productRepo pr;

	@Override
	public String insertAndUpdateProduct(String productJson, MultipartFile imgfile) {

		// converting productJson to product object.
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			// converting json to product object.
			product productData = objectMapper.readValue(productJson, product.class);

			int pId = productData.getProductId();

			product existingProduct = pr.productExist(productData.getProductName(), productData.getCategoryId(),
					productData.getSubCategoryId());

			if (pId == 0) {

				if (existingProduct != null) {
					return "product already exist";
				} else {
					// Get the product name
					String productName = productData.getProductName();

					String newFileName = saveImg(imgfile, productName);

					// now product image is saved in folder so we update null ProductImage with
					// newFileName.
					productData.setProductImage(newFileName);
					pr.save(productData);

					return "product inserted";
				}
			} else {
				if (existingProduct != null) {
					int existingProductId = existingProduct.getProductId();

					if (existingProductId == pId) {

						// in case user not select image.
						if (imgfile == null) {
							// setting existing image name because user send null in img.
							String existingProductImgPath = pr.getImgUrl(productData.getProductId());

							productData.setProductImage(existingProductImgPath);
							pr.save(productData);
						} else {
							System.out.println("222");
							// Get the product name
							String productName = productData.getProductName();

							String newFileName = saveImg(imgfile, productName);
							// now product image is saved in folder so we update null ProductImage with
							// newFileName.
							productData.setProductImage(newFileName);
							pr.save(productData);
						}
						return "product updated";
					} else {
						return "product already exist";
					}
				} else {

					// in case user not select image.
					if (imgfile == null) {
						String existingProductImgPath = pr.getImgUrl(productData.getProductId());
						productData.setProductImage(existingProductImgPath);
						pr.save(productData);
					} else {
						// Get the product name
						String productName = productData.getProductName();

						String newFileName = saveImg(imgfile, productName);
						// now product image is saved in folder so we update null ProductImage with
						// newFileName.
						productData.setProductImage(newFileName);
						pr.save(productData);
					}
					return "product updated";
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}

	@Override
	public List<Map<String, Object>> selectAllProduct() {

		// AllProductObj = [[],[],[]]
		List<Object[]> AllProductObj = pr.findProduct();

		// AllProductJson = {{},{},{}}
		List<Map<String, Object>> AllProductJson = new ArrayList<>();

		for (Object[] result : AllProductObj) {

			// map = {}
			Map<String, Object> map = new LinkedHashMap<>();

			map.put("productImage", result[0]);
			map.put("productId", result[1]);
			map.put("activeId", result[2]);
			map.put("productName", result[3]);
			map.put("productDescription", result[4]);
			map.put("productPrice", result[5]);
			map.put("productDiscount", result[6]);
			map.put("categoryName", result[7]);

			AllProductJson.add(map);
		}

		return AllProductJson;
	}

	String saveImg(MultipartFile imgfile, String ProductName) throws IOException {

		// get the file name
		String fileName = imgfile.getOriginalFilename();

		// it contain file extension(.jpg,.png)
		String fileNameExtension = fileName.substring(fileName.lastIndexOf("."));

		// Set the new file name with product name
		String newFileName = ProductName + fileNameExtension;

		// Define upload folder path
		Path uploadPath = Paths
				.get("/media/soham-vasani/D1/E Five Java/exercise4/ProductMaster/src/main/resources/static/ProductImg");

		// Create upload folder if it doesn't exist
		if (!Files.exists(uploadPath)) {
			try {
				Files.createDirectories(uploadPath);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		try (InputStream inputStream = imgfile.getInputStream()) {
			// Resolve the file path
			Path filePath = uploadPath.resolve(newFileName);

			// Copy the file to the upload folder
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ioe) {
			throw new IOException("Could not save file: " + newFileName, ioe);
		}
		return newFileName;
	}

	@Override
	public Boolean deleteProduct(Integer productID) {

		product existingProduct = pr.findById(productID).orElse(null);

		if (existingProduct != null) {

			existingProduct.setActiveId(9);
			pr.save(existingProduct);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public product selectProductById(int productId) {
		product productData = pr.findById(productId).orElse(null);
		return productData;
	}

	@Override
	public String productExcel() {

		// Create a new Workbook
		Workbook workbook = new XSSFWorkbook();

		// Create a Sheet
		Sheet sheet = workbook.createSheet("Product");
		

		List<Map<String, Object>> allproducts = selectAllProduct();

		// Create header row
		Row headerRow = sheet.createRow(0);

		// Create headers
		String[] headers = { "Product ID", "Product Name", "Product Description", "Category Name", "Product Price",
				"Product Discount" };

		for (int i = 0; i < headers.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(headers[i]);
		}
			
		int bodyRow =1;
		
		for(int i=0; i<allproducts.size(); i++) {
			
			Row bRow = sheet.createRow(bodyRow);
			
			int pId = (Integer) allproducts.get(i).get("productId");
			String pName = (String) allproducts.get(i).get("productName");
			String pDesc = (String) allproducts.get(i).get("productDescription");
			String pCName = (String) allproducts.get(i).get("categoryName");
			float pPrice = (Float) allproducts.get(i).get("productPrice");
			int pDiscount = (Integer) allproducts.get(i).get("productDiscount");
			
			Cell cell0 = bRow.createCell(0);
			cell0.setCellValue(pId);
			
			Cell cell1 = bRow.createCell(1);
			cell1.setCellValue(pName);
			
			Cell cell2 = bRow.createCell(2);
			cell2.setCellValue(pDesc);
			
			Cell cell3 = bRow.createCell(3);
			cell3.setCellValue(pCName);
			
			Cell cell4 = bRow.createCell(4);
			cell4.setCellValue(pPrice);
			
			Cell cell5 = bRow.createCell(5);
			cell5.setCellValue(pDiscount);
			
			bodyRow++;
		}

//		create folder if not exist.
		Path uploadPath = Paths
				.get("D:\\efive\\ProductMaster\\src\\main\\resources\\static\\ProductExcel");

		if (!Files.exists(uploadPath)) {
			try {
				Files.createDirectories(uploadPath);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

//		create file with name product.xlsx.
		Path filePath = uploadPath.resolve("Product_Details.xlsx");

//		writing workbook data in xlsx file.

		try (FileOutputStream fileOut = new FileOutputStream(filePath.toFile())) {
			workbook.write(fileOut);
			return "Excel file has been created successfully!";
		} catch (IOException e) {
			e.printStackTrace();
			return "Excel file no created!";
		}

	}

}
