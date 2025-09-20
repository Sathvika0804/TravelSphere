import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSearch, FaTimesCircle } from "react-icons/fa";

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("bookingDate");

  // ✅ Read the same key used in SignIn.jsx
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (!uid) {
      toast.error("❌ Please login to view your bookings", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/bookings/user/${uid}`);
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        toast.error("❌ Error fetching bookings", { position: "top-center" });
        setError("Error fetching bookings");
      } finally {
        setLoading(false); // ✅ ensures spinner stops
      }
    };

    fetchBookings();
  }, [uid]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`http://localhost:8080/bookings/delete/${bookingId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings(bookings.filter((b) => b.bid !== bookingId));
        toast.success("✅ Booking canceled successfully!");
      } else {
        toast.error("❌ Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error canceling booking");
    }
  };

  const filteredAndSortedBookings = useMemo(() => {
    const filtered = bookings.filter(
      (b) =>
        b.packages?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) =>
      sortBy === "price"
        ? (a.packages?.price || 0) - (b.packages?.price || 0)
        : new Date(b.bookingDate) - new Date(a.bookingDate)
    );
  }, [bookings, searchTerm, sortBy]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📌 My Bookings</h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          ⬅ Back to Home
        </button>
      </div>

      {loading && <p className="text-center text-xl text-blue-500">Loading bookings...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {!loading && !error && (
        <>
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-1/2">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by package or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="bookingDate">Date (Newest)</option>
                <option value="price">Price (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Booking List */}
          {filteredAndSortedBookings.length === 0 ? (
            <p className="text-gray-600 text-center text-lg mt-8">
              No bookings found. Try adjusting your search or filters.
            </p>
          ) : (
            <ul className="space-y-6">
              {filteredAndSortedBookings.map((booking) => (
                <li
                  key={booking.bid}
                  className="p-6 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-2xl text-blue-700">
                      {booking.packages?.name}
                    </h3>
                    <div className="mt-2 text-gray-700 space-y-1 text-sm">
                      <p>
                        <strong>Duration:</strong> {booking.packages?.duration}
                      </p>
                      <p>
                        <strong>Price:</strong> 💰 {booking.packages?.price}
                      </p>
                      <p>
                        <strong>Booked by:</strong> {booking.user?.name} ({booking.user?.email})
                      </p>
                      <p>
                        <strong>Booking Date:</strong> {booking.bookingDate}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex-shrink-0">
                    <button
                      onClick={() => handleCancelBooking(booking.bid)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <FaTimesCircle />
                      <span>Cancel Booking</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default BookingsPage;
