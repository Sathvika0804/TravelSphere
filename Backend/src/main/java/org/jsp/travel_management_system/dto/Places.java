package org.jsp.travel_management_system.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Places {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String destination; // e.g. "Paris"
    private String name;        // e.g. "Eiffel Tower"
    private String imageUrl;    // e.g. "/images/international/paris/eiffel_tower.jpeg"
    private String description; // e.g. "The iconic symbol of Paris"

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
