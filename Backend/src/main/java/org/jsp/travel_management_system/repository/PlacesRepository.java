package org.jsp.travel_management_system.repository;

import java.util.List;
import org.jsp.travel_management_system.dto.Places;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacesRepository extends JpaRepository<Places, Integer> {
    List<Places> findByDestinationIgnoreCase(String destination);
}
