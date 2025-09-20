package org.jsp.travel_management_system.repository;

import java.util.List;

import org.jsp.travel_management_system.dto.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookingsRepository extends JpaRepository<Bookings, Integer>{

	 @Query("SELECT b FROM Bookings b WHERE b.user.id = :uid")
	    List<Bookings> fetchBookingsByUser(@Param("uid") int uid);
}
