// bookingsservice
package org.jsp.travel_management_system.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.jsp.travel_management_system.dao.BookingsDao;
import org.jsp.travel_management_system.dto.Bookings;
import org.jsp.travel_management_system.dto.Packages;
import org.jsp.travel_management_system.dto.User;
import org.jsp.travel_management_system.repository.PackagesRepository;
import org.jsp.travel_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingsService {

    @Autowired
    private BookingsDao bookingsDao;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PackagesRepository packagesRepository;

    // Fetch all bookings
    public List<Bookings> fetchAllBookings() {
        return bookingsDao.fetchAllBookings();
    }

    // Fetch bookings for a user
    public List<Bookings> fetchBookingsByUser(int uid) {
        return bookingsDao.fetchBookingsByUser(uid);
    }

    // Save booking
    public Bookings saveBookings(int uid, int pid) {
        Optional<User> userOpt = userRepository.findById(uid);
        Optional<Packages> pkgOpt = packagesRepository.findById(pid);

        if (userOpt.isPresent() && pkgOpt.isPresent()) {
            Bookings booking = new Bookings();
            booking.setBookingDate(LocalDate.now());
            booking.setUser(userOpt.get());
            booking.setPackages(pkgOpt.get());

            return bookingsDao.saveBookings(booking);
        }
        throw new RuntimeException("User or Package not found");
    }

    // Cancel booking
    public boolean cancelBooking(int bid) {
        Optional<Bookings> booking = bookingsDao.findById(bid);
        if (booking.isPresent()) {
            bookingsDao.deleteById(bid);
            return true;
        }
        return false;
    }
}
