package com.ProductMaster.entity;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="category")

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class category {
	
	//lombok is not working in eclipse so we add getter/setter/toString/constructor

    @Override
	public String toString() {
		return "category [categoryId=" + categoryId + ", activeId=" + activeId + ", categoryName=" + categoryName
				+ ", categoryDescription=" + categoryDescription + "]";
	}
    
	public category() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public category(int categoryId, int activeId, String categoryName, String categoryDescription) {
		super();
		this.categoryId = categoryId;
		this.activeId = activeId;
		this.categoryName = categoryName;
		this.categoryDescription = categoryDescription;
	}
	
	public int getCategoryId() {
		return categoryId;
	}
	
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public int getActiveId() {
		return activeId;
	}
	public void setActiveId(int activeId) {
		this.activeId = activeId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryDescription() {
		return categoryDescription;
	}
	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int categoryId;
	
	@Column(name="activeId")
    public int activeId;
    @Column(name="categoryName")
    public String categoryName;
    @Column(name = "categoryDescription")
    public String categoryDescription;
    
}
