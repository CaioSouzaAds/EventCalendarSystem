package com.caio.backend.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.caio.backend.entities.Event;
import com.caio.backend.entities.User;
import com.caio.backend.entities.dto.EventDTO;
import com.caio.backend.entities.dto.UserWithEventsDTO;
import com.caio.backend.repositories.UserRepository;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
	}

	public User createUser(User user) {
		// Codificar a senha antes de salvar no banco de dados
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);

		// Salvar o usuário com a senha codificada
		User newUser = userRepository.save(user);
		return newUser;
	}

	public List<UserWithEventsDTO> getAllUsersWithEvents() {
	    return userRepository.findAll().stream()
	            .map(user -> new UserWithEventsDTO(
	                    user.getId(),
	                    user.getName(),
	                    user.getEmail(),
	                    convertToEventDTOSet(user.getEvents())))
	            .collect(Collectors.toList());
	}

	private Set<EventDTO> convertToEventDTOSet(Set<Event> events) {
	    return events.stream()
	            .map(event -> new EventDTO(event.getId(), event.getEventName(), event.getStartDate(), event.getEndDate()))
	            .collect(Collectors.toSet());
	}



}
