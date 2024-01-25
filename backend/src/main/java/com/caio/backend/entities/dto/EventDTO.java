package com.caio.backend.entities.dto;

import java.util.Date;

public record EventDTO(Long id, String eventName, Date startDate, Date endDate) {
    
}
