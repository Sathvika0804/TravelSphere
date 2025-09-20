package org.jsp.travel_management_system.service;

import java.util.List;
import java.util.Optional;
import org.jsp.travel_management_system.dao.PackagesDao;
import org.jsp.travel_management_system.dto.Packages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PackagesService {

    @Autowired
    private PackagesDao packagesDao;

    public Packages savePackages(Packages packages) {
        return packagesDao.savePackages(packages);
    }

    public List<Packages> fetchAllPackages() {
        return packagesDao.fetchAllPackages();
    }

    public List<Packages> fetchByCategory(String category) {
        return packagesDao.fetchByCategory(category);
    }

    public Optional<Packages> fetchById(int id) {
        return packagesDao.fetchById(id);
    }
    
    public void deletePackage(int id) {
        packagesDao.deletePackage(id);
    }
    
    public List<Packages> getAdventurePackages() {
        return packagesDao.fetchByCategory("Adventure");
    }


}
