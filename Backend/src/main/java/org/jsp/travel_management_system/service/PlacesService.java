package org.jsp.travel_management_system.service;

import java.util.List;
import org.jsp.travel_management_system.dao.PlacesDao;
import org.jsp.travel_management_system.dto.Places;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlacesService {

    @Autowired
    private PlacesDao placesDao;

    public Places savePlace(Places place) {
        return placesDao.savePlace(place);
    }

    public List<Places> fetchPlacesByDestination(String destination) {
        return placesDao.fetchPlacesByDestination(destination);
    }
}
