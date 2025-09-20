package org.jsp.travel_management_system.repository;


import org.jsp.travel_management_system.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	@Query("select u from User u where u.email = ?1")
	User findByEmail(String email);
}
