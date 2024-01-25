package com.caio.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.caio.backend.entities.Event;
import com.caio.backend.entities.User;
import com.caio.backend.entities.dto.EventDTO;
import com.caio.backend.repositories.EventRepository;
import com.caio.backend.repositories.UserRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private UserRepository userRepository;

	public EventDTO createEvent(EventDTO eventDto, Long userId) {
	    try {
	        User user = userRepository.findById(userId)
	                .orElseThrow(() -> new RuntimeException("Usuário com ID " + userId + " não encontrado"));

	        Event event = convertToEvent(eventDto, user);
	        Event savedEvent = eventRepository.save(event);

	        return new EventDTO(savedEvent.getId(), savedEvent.getEventName(), savedEvent.getStartDate(), savedEvent.getEndDate());
	    } catch (Exception e) {
	        throw new RuntimeException("Erro ao criar evento", e);
	    }
	}




	public EventDTO updateEvent(Long eventId, EventDTO eventDto) {
		Event event = eventRepository.findById(eventId)
				.orElseThrow(() -> new RuntimeException("Evento com ID " + eventId + " não encontrado"));

		updateEventProperties(event, eventDto);

		Event updatedEvent = eventRepository.save(event);
		return new EventDTO(updatedEvent.getId(), updatedEvent.getEventName(), updatedEvent.getStartDate(),
				updatedEvent.getEndDate());
	}

	public List<EventDTO> getAllEventsByUserId(Long userId) {
		return eventRepository.findAllByUserId(userId).stream().map(
				event -> new EventDTO(event.getId(), event.getEventName(), event.getStartDate(), event.getEndDate()))
				.collect(Collectors.toList());
	}

	public void deleteEvent(Long eventId) {
		if (!eventRepository.existsById(eventId)) {
			throw new RuntimeException("Evento com ID " + eventId + " não encontrado");
		}
		eventRepository.deleteById(eventId);
	}
	
	private Event convertToEvent(EventDTO eventDto, User user) {
	    Event event = new Event();
	    event.setEventName(eventDto.eventName());
	    event.setStartDate(eventDto.startDate());
	    event.setEndDate(eventDto.endDate());
	    event.setUser(user);
	    return event;
	}


	private void updateEventProperties(Event event, EventDTO eventDto) {
		event.setEventName(eventDto.eventName());
		event.setStartDate(eventDto.startDate());
		event.setEndDate(eventDto.endDate());

	}

}
