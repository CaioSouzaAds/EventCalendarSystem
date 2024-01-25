package com.caio.backend.services.exceptions;

@SuppressWarnings("serial")
public class CustomException extends RuntimeException {
    public CustomException(String message, Throwable cause) {
        super(message, cause);
    }
}