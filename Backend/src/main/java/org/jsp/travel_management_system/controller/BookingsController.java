package org.jsp.travel_management_system.controller;

import java.util.List;
import java.util.Optional;

import org.jsp.travel_management_system.dto.Bookings;
import org.jsp.travel_management_system.dto.Packages;
import org.jsp.travel_management_system.dto.User;
import org.jsp.travel_management_system.repository.PackagesRepository;
import org.jsp.travel_management_system.repository.UserRepository;
import org.jsp.travel_management_system.service.BookingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/bookings")
public class BookingsController {

    @Autowired
    private BookingsService bookingsService;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PackagesRepository packagesRepository;

    // Fetch all bookings
    @GetMapping("/fetch")
    public List<Bookings> fetchAllBookings() {
        return bookingsService.fetchAllBookings();
    }

    // Fetch bookings by user
    @GetMapping("/user/{uid}")
    public List<Bookings> fetchBookingsByUser(@PathVariable int uid) {
        return bookingsService.fetchBookingsByUser(uid);
    }

    // Save booking
//    @PostMapping("/save")
//    public ResponseEntity<Bookings> saveBookings(@RequestParam int uid, @RequestParam int pid) {
//        try {
//            Bookings booking = bookingsService.saveBookings(uid, pid);
//            return ResponseEntity.ok(booking);
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }
    
    @PostMapping("/save")
    public ResponseEntity<?> saveBookings(@RequestParam int uid, @RequestParam int pid) {
        try {
            // 🚨 Validate user
            Optional<User> userOpt = userRepository.findById(uid);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("❌ Please login before booking!");
            }

            // 🚨 Validate package
            Optional<Packages> pkgOpt = packagesRepository.findById(pid);
            if (pkgOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("❌ Invalid package, please select a valid one!");
            }

            // ✅ Save booking if valid
            Bookings booking = bookingsService.saveBookings(uid, pid);
            return ResponseEntity.ok(booking);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("⚠️ Booking failed: " + e.getMessage());
        }
    }
    


    // Cancel booking
    @DeleteMapping("/delete/{bid}")
    public ResponseEntity<String> cancelBooking(@PathVariable int bid) {
        if (bookingsService.cancelBooking(bid)) {
            return ResponseEntity.ok("Booking canceled successfully");
        } else {
            return ResponseEntity.status(404).body("Booking not found");
        }
    }
}