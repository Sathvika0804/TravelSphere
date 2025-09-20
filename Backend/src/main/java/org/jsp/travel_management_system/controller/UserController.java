package org.jsp.travel_management_system.controller;

import java.util.List;

import org.jsp.travel_management_system.dto.User;
import org.jsp.travel_management_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user") // ✅ Changed mapping to /users to match front-end
public class UserController {

    @Autowired
    private UserService userService;

    // Save new User
    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return new ResponseEntity<User>(savedUser, HttpStatus.CREATED);
    }
    // find user by id
    @GetMapping("/find/{uid}")
    public User findUserById(@PathVariable int uid) {
        return userService.findUserById(uid);
    }
    
    // fetching all the users
    @GetMapping("/fetch")
    public List<User> fetchAllUser(){
        return userService.fetchAllUser();
    }
    
    @DeleteMapping("/delete/{uid}")
    public void deleteUserById(@PathVariable int uid) {
        userService.deleteUserById(uid);
    }
    
	
//	@PostMapping("/login")
//	public User login(@RequestBody User user) {
//		return userService.login(user);
//	}
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User u = userService.login(user);
        if(u != null) {
            return ResponseEntity.ok(u);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}