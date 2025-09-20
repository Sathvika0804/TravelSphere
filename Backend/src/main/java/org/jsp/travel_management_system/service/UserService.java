package org.jsp.travel_management_system.service;

import java.util.List;

import org.jsp.travel_management_system.dao.UserDao;
import org.jsp.travel_management_system.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public User saveUser(User user) {
        return userDao.saveUser(user);
    }

    public User findUserById(int uid) {
        User userDB = userDao.findUserById(uid);
        if(userDB != null) {
            return userDB;
        }else {
            return null;
        }
    }

    public List<User> fetchAllUser(){
        return userDao.fetchAllUser();
    }

    public void deleteUserById(int uid) {
        userDao.deleteUserById(uid);
    }

    public User login(User user) {
        return userDao.login(user.getEmail(), user.getPassword());
    }

}