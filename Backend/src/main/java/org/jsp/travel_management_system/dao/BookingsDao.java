package org.jsp.travel_management_system.dao;

import java.util.List;
import java.util.Optional;

import org.jsp.travel_management_system.dto.Bookings;
import org.jsp.travel_management_system.repository.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookingsDao {

	@Autowired
	private BookingsRepository bookingsRepository;
	
	public List<Bookings> fetchAllBookings(){
		return bookingsRepository.findAll();
	}

	public List<Bookings> fetchBookingsByUser(int uid) {
	    return bookingsRepository.fetchBookingsByUser(uid);
	}
	
	public Bookings saveBookings(Bookings bookings) {
	    return bookingsRepository.save(bookings);
	}

	public void deleteById(int bid) {
        bookingsRepository.deleteById(bid);
    }
	
	public Optional<Bookings> findById(int bid) {
        return bookingsRepository.findById(bid);
    }

}
