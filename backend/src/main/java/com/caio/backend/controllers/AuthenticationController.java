package com.caio.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caio.backend.config.TokenService;
import com.caio.backend.entities.User;
import com.caio.backend.entities.dto.AuthenticationDTO;
import com.caio.backend.entities.dto.LoginResponseDTO;
import com.caio.backend.entities.dto.RegisterDTO;
import com.caio.backend.entities.dto.UserDTO;
import com.caio.backend.repositories.UserRepository;

import jakarta.validation.Valid;


@RestController
@RequestMapping("auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private TokenService tokenService;


	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data) {
	    UsernamePasswordAuthenticationToken usernamePassword = 
	        new UsernamePasswordAuthenticationToken(data.email(), data.password());
	    Authentication auth = this.authenticationManager.authenticate(usernamePassword);
	    
	    User user = (User) auth.getPrincipal();
	    String token = tokenService.generateToken(user);
	    
	    // Converta User para UserDTO
	    UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getEmail());
	    
	    // Crie o LoginResponseDTO com UserDTO e token
	    LoginResponseDTO response = new LoginResponseDTO(userDTO, token);
	    
	    return ResponseEntity.ok(response);
	}

    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        if(this.repository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build();
        
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), encryptedPassword, data.role());
        
        this.repository.save(newUser);
        
        return ResponseEntity.ok().build();
    }
}
