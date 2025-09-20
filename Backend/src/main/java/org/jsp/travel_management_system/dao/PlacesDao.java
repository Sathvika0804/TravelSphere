package org.jsp.travel_management_system.dao;

import java.util.List;
import org.jsp.travel_management_system.dto.Places;
import org.jsp.travel_management_system.repository.PlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PlacesDao {

    @Autowired
    private PlacesRepository placesRepository;

    public Places savePlace(Places place) {
        return placesRepository.save(place);
    }

    public List<Places> fetchPlacesByDestination(String destination) {
        return placesRepository.findByDestinationIgnoreCase(destination);
    }
}
