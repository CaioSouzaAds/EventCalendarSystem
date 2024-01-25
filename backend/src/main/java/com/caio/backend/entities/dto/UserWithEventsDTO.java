package com.caio.backend.entities.dto;

import java.util.Set;

public record UserWithEventsDTO(Long id, String name, String email, Set<EventDTO> events) {
    
}
