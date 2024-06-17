package com.ProductMaster.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ProductMaster.entity.signup;

public interface signupRepo extends JpaRepository<signup,String>{
	
	
	@Query(value = "select * from signup where email_id = :userEmailId and password = :userPassword",nativeQuery=true)
	signup loginUserExist(@Param("userEmailId") String emailId,@Param("userPassword") String password);
}
