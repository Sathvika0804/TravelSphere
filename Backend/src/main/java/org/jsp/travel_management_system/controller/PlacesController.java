package org.jsp.travel_management_system.controller;

import java.util.List;
import org.jsp.travel_management_system.dto.Places;
import org.jsp.travel_management_system.service.PlacesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/places")
public class PlacesController {

    @Autowired
    private PlacesService placesService;

    @PostMapping("/save")
    public Places savePlace(@RequestBody Places place) {
        return placesService.savePlace(place);
    }

    
//    @GetMapping("/{destination}")
//    public List<Places> getPlacesByDestination(@PathVariable String destination) {
//        return placesService.fetchPlacesByDestination(destination);
//    }
    
    @GetMapping("/destination/{destination}")
    public List<Places> getPlacesByDestination(@PathVariable String destination) {
        return placesService.fetchPlacesByDestination(destination);
    }
    
    
}
