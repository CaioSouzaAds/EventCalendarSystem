package com.caio.backend.entities.dto;

import com.caio.backend.entities.enums.UserRole;

public record RegisterDTO(String name,String email, String password, UserRole role) {

}
