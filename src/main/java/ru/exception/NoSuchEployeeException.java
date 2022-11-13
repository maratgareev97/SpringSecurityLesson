package ru.exception;

public class NoSuchEployeeException extends RuntimeException {
    public NoSuchEployeeException(String message) {
        super(message);
    }
}
