package com.caio.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.caio.backend.entities.Event;
import com.caio.backend.entities.User;
import com.caio.backend.entities.dto.EventDTO;
import com.caio.backend.entities.dto.UserWithEventsDTO;
import com.caio.backend.repositories.UserRepository;
import com.caio.backend.services.exceptions.CustomException;

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
		// Codifica a senha antes de salvar no banco de dados
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);

		// Salva usuário com a senha codificada
		User newUser = userRepository.save(user);
		return newUser;
	}
	
	public ResponseEntity<UserWithEventsDTO> getUserWithEventsById(Long id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                UserWithEventsDTO userDTO = new UserWithEventsDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        convertToEventDTOSet(user.getEvents()));
                return ResponseEntity.ok(userDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            
            throw new CustomException("Erro ao buscar usuário por ID", e);
        }
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
	
	
	public User updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            //Codificar a senha
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            
            return userRepository.save(user);
        }).orElse(null);
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }



}
