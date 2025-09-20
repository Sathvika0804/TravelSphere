
package org.jsp.travel_management_system.dao;

import java.util.List;
import java.util.Optional;

import org.jsp.travel_management_system.dto.User;
import org.jsp.travel_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao {

    @Autowired
    private UserRepository userRepository;

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findUserById(int uid) {
        Optional<User> userDB = userRepository.findById(uid);
        if(userDB.isEmpty()) {
            return null;
        }
        else {
            return userDB.get();
        }
    }
    
    public User login(String email, String password) {
        User userDb = userRepository.findByEmail(email);
        if (userDb != null && userDb.getPassword().equals(password)) {
            return userDb;
        }
        return null;
    }
    
    public List<User> fetchAllUser(){
        return userRepository.findAll();
    }

    public void deleteUserById(int uid) {
        userRepository.deleteById(uid);
    }
}