package com.ProductMaster.entity;

import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "product")
public class product {	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="productId")
	int productId;
	
	@Column(name="activeId")
	int activeId;
	
	@Column(name="categoryId")
	int categoryId;
	
	@Column(name="subCategoryId")
	int subCategoryId;	
	
	@Column(name="productName")
	String productName;
	
	@Column(name="productDescription")
	String productDescription;
	
	@Column(name="productPrice")
	float productPrice;
	
	@Column(name="productSerialNo")
	String productSerialNo;
	
	@Column(name="warrantySupport")
	String warrantySupport;
	
	@Column(name="productCondition")
	String productCondition;
	
	@Column(name="productColour")
	String productColour;
	
	@Column(name="productDiscount")
	int productDiscount;
	
	@Column(name="productImage")
	String productImage;		
		
	@Column(name="productManufacturingDate")
	String productManufacturingDate;
	
	@Column(name="productValidFromDate")
	String productValidFromDate;
	
	@Column(name="productValidToDate")
	String productValidToDate;

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public int getActiveId() {
		return activeId;
	}

	public void setActiveId(int activeId) {
		this.activeId = activeId;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public int getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(int subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public float getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(float productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductSerialNo() {
		return productSerialNo;
	}

	public void setProductSerialNo(String productSerialNo) {
		this.productSerialNo = productSerialNo;
	}

	public String getWarrantySupport() {
		return warrantySupport;
	}

	public void setWarrantySupport(String warrantySupport) {
		this.warrantySupport = warrantySupport;
	}

	public String getProductCondition() {
		return productCondition;
	}

	public void setProductCondition(String productCondition) {
		this.productCondition = productCondition;
	}

	public String getProductColour() {
		return productColour;
	}

	public void setProductColour(String productColour) {
		this.productColour = productColour;
	}

	public int getProductDiscount() {
		return productDiscount;
	}

	public void setProductDiscount(int productDiscount) {
		this.productDiscount = productDiscount;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public String getProductManufacturingDate() {
		return productManufacturingDate;
	}

	public void setProductManufacturingDate(String productManufacturingDate) {
		this.productManufacturingDate = productManufacturingDate;
	}

	public String getProductValidFromDate() {
		return productValidFromDate;
	}

	public void setProductValidFromDate(String productValidFromDate) {
		this.productValidFromDate = productValidFromDate;
	}

	public String getProductValidToDate() {
		return productValidToDate;
	}

	public void setProductValidToDate(String productValidToDate) {
		this.productValidToDate = productValidToDate;
	}

	@Override
	public String toString() {
		return "product [productId=" + productId + ", activeId=" + activeId + ", categoryId=" + categoryId
				+ ", subCategoryId=" + subCategoryId + ", productName=" + productName + ", productDescription="
				+ productDescription + ", productPrice=" + productPrice + ", productSerialNo=" + productSerialNo
				+ ", warrantySupport=" + warrantySupport + ", productCondition=" + productCondition + ", productColour="
				+ productColour + ", productDiscount=" + productDiscount + ", productImage=" + productImage
				+ ", productManufacturingDate=" + productManufacturingDate + ", productValidFromDate="
				+ productValidFromDate + ", productValidToDate=" + productValidToDate + "]";
	}

	public product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public product(int productId, int activeId, int categoryId, int subCategoryId, String productName,
			String productDescription, float productPrice, String productSerialNo, String warrantySupport,
			String productCondition, String productColour, int productDiscount, String productImage,
			String productManufacturingDate, String productValidFromDate, String productValidToDate) {
		super();
		this.productId = productId;
		this.activeId = activeId;
		this.categoryId = categoryId;
		this.subCategoryId = subCategoryId;
		this.productName = productName;
		this.productDescription = productDescription;
		this.productPrice = productPrice;
		this.productSerialNo = productSerialNo;
		this.warrantySupport = warrantySupport;
		this.productCondition = productCondition;
		this.productColour = productColour;
		this.productDiscount = productDiscount;
		this.productImage = productImage;
		this.productManufacturingDate = productManufacturingDate;
		this.productValidFromDate = productValidFromDate;
		this.productValidToDate = productValidToDate;
	}
	
}
