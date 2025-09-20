package org.jsp.travel_management_system.controller;

import java.util.List;
import java.util.Optional;

import org.jsp.travel_management_system.dto.Packages;
import org.jsp.travel_management_system.service.PackagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/packages")
public class PackagesController {

    @Autowired
    private PackagesService packagesService;

    // Save a package
    @PostMapping("/save")
    public Packages savePackages(@RequestBody Packages packages) {
        return packagesService.savePackages(packages);
    }

    // Fetch all packages
    @GetMapping("/fetch")
    public List<Packages> fetchAllPackages() {
        return packagesService.fetchAllPackages();
    }

    // Fetch packages by category (generic endpoint for all categories)
    @GetMapping("/category/{category}")
    public List<Packages> getByCategory(@PathVariable String category) {
        return packagesService.fetchByCategory(category);
    }

    // Fetch package by ID
    @GetMapping("/{id}")
    public Optional<Packages> getById(@PathVariable int id) {
        return packagesService.fetchById(id);
    }

    // Delete a package by ID
    @DeleteMapping("/delete/{id}")
    public String deletePackage(@PathVariable int id) {
        packagesService.deletePackage(id);
        return "Package with ID: " + id + " has been deleted.";
    }
    
 // Fetch International packages
    @GetMapping("/international")
    public List<Packages> getInternationalPackages() {
        return packagesService.fetchByCategory("International");
    }
}
