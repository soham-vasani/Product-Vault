package com.ProductMaster.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="subCategory")

public class subCategory {
	
	@Column(name="categoryId")
	int categoryId;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="subCategoryId")
	int subCategoryId;
	
	@Column(name="activeId")
	int activeId;
	
	@Column(name="subCategoryName")
	String subCategoryName;
	
	@Column(name="subCategoryDescription")
	String subCategoryDescription;
	
	
	//getter/setter/constructor/toString.
	
	@Override
	public String toString() {
		return "subCategory [categoryId=" + categoryId + ", subCategoryId=" + subCategoryId + ", activeId=" + activeId
				+ ", subCategoryName=" + subCategoryName + ", subCategoryDescription=" + subCategoryDescription + "]";
	}

	public subCategory() {
		super();
		// TODO Auto-generated constructor stub
	}

	public subCategory(int categoryId, int subCategoryId, int activeId, String subCategoryName,
			String subCategoryDescription) {
		super();
		this.categoryId = categoryId;
		this.subCategoryId = subCategoryId;
		this.activeId = activeId;
		this.subCategoryName = subCategoryName;
		this.subCategoryDescription = subCategoryDescription;
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

	public int getActiveId() {
		return activeId;
	}

	public void setActiveId(int activeId) {
		this.activeId = activeId;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public String getSubCategoryDescription() {
		return subCategoryDescription;
	}

	public void setSubCategoryDescription(String subCategoryDescription) {
		this.subCategoryDescription = subCategoryDescription;
	}
	
}
