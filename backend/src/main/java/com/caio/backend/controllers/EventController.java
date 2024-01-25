package com.caio.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caio.backend.entities.dto.EventDTO;
import com.caio.backend.services.EventService;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/{userId}")
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventDTO eventDto, @PathVariable Long userId) {
        EventDTO createdEvent = eventService.createEvent(eventDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventDTO>> getEventsByUserId(@PathVariable Long userId) {
        List<EventDTO> events = eventService.getAllEventsByUserId(userId);
        return ResponseEntity.ok(events);
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventDTO> updateEvent(@PathVariable Long eventId, @RequestBody EventDTO eventDto) {
        EventDTO updatedEvent = eventService.updateEvent(eventId, eventDto);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return ResponseEntity.noContent().build();
    }
}

