package com.caio.backend.config;






import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.caio.backend.entities.User;

@Service
public class TokenService {

	@Value("${api.security.token.secret}")
	private String secret;

	public String generateToken(User user) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			String token = JWT.create()
					.withIssuer("auth-api")
					.withSubject(user.getEmail())
					.withExpiresAt(genExpirationDate())
					.sign(algorithm);
			return token;
		} catch (JWTCreationException exception) {
			throw new RuntimeException("Erro while generating token", exception);
		}

	}
	
	public String validateToken(String token) {
	    try {
	        Algorithm algorithm = Algorithm.HMAC256(secret);
	        JWTVerifier verifier = JWT.require(algorithm)
	                .withIssuer("auth-api")
	                .build();
	        DecodedJWT jwt = verifier.verify(token);
	        return jwt.getSubject(); 
	    } catch (JWTVerificationException exception) {
	        return ""; 
	    }
	}



	private Instant genExpirationDate() {
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
	}
}
