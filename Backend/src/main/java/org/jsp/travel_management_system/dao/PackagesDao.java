
package org.jsp.travel_management_system.dao;

import java.util.List;
import java.util.Optional;
import org.jsp.travel_management_system.dto.Packages;
import org.jsp.travel_management_system.repository.PackagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PackagesDao {

    @Autowired
    private PackagesRepository packagesRepository;

    public Packages savePackages(Packages packages) {
        return packagesRepository.save(packages);
    }

    public List<Packages> fetchAllPackages() {
        return packagesRepository.findAll();
    }
    
    public List<Packages> fetchByCategory(String category) {
        return packagesRepository.findByCategoryIgnoreCase(category);
    }


    public Optional<Packages> fetchById(int id) {
        return packagesRepository.findById(id);
    }

    public void deletePackage(int id) {
        packagesRepository.deleteById(id);
    }
    
//    public List<Packages> getAdventurePackages(){
//    	return packagesRepository.findAll();
//    }
}

