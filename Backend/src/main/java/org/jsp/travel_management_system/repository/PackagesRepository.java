package org.jsp.travel_management_system.repository;


import java.util.List;

import org.jsp.travel_management_system.dto.Packages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PackagesRepository extends JpaRepository<Packages, Integer> {

    @Query("SELECT p FROM Packages p WHERE LOWER(p.category) = LOWER(:category)")
    List<Packages> findByCategoryIgnoreCase(@Param("category") String category);
}

