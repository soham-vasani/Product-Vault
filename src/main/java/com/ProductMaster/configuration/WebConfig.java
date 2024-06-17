package com.ProductMaster.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
/**
 * Add handlers to serve static resources such as images, js, and, css
 * files from specific locations under web application root, the classpath,
 * and others.
 * @see ResourceHandlerRegistry
 */
@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	@Override 
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		//for img.
		
		//projectDir by default get path till project folder.
		//projectDir contain:- D://E Five Java//exercise4//ProductMaster
		String projectDir = System.getProperty("user.dir");
		
		//ImgDir contain:- D:/E Five Java/exercise4/ProductMaster/src/main/resources/static/ProductImg
		String ImgDir = projectDir + "/src/main/resources/static/ProductImg/";
		
		//now we can access the product images using pImg. 
		//ex:- http://localhost:9090/pImg/gt.png(img name)
		registry.addResourceHandler("/pImg/**")
				.addResourceLocations("file:"+ImgDir);		
		
		//for excel file.
		
		String ExcelDir = projectDir + "/src/main/resources/static/ProductExcel/";
		
		registry.addResourceHandler("/pExcel/**")
				.addResourceLocations("file:"+ExcelDir);
	}
	
}
