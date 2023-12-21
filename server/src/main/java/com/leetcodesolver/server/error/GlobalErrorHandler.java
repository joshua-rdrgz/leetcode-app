package com.leetcodesolver.server.error;

import com.leetcodesolver.server.responses.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalErrorHandler {

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleInvalidInput(InvalidInputException ex) {
        ErrorResponse error = new ErrorResponse(
                "Invalid input received: " + ex.getMessage(),
                HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleNotFoundError(NoHandlerFoundException ex) {
        System.out.println("⛔️ ROUTE NOT FOUND: " + ex.getMessage());

        ErrorResponse error = new ErrorResponse(
                String.format("The route you requested was not found: %s %s",
                        ex.getHttpMethod(),
                        ex.getRequestURL()),
                HttpStatus.NOT_FOUND.value());

        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorResponse> handleError(Exception ex) {
        System.out.println("🔥🔥🔥 UNEXPECTED ERROR 🔥🔥🔥: " + ex.getMessage());
        // You might want to expand upon this logging functionality.

        ErrorResponse error = new ErrorResponse(
                "Uh oh, something went wrong.... 🤔  Check back later!",
                HttpStatus.INTERNAL_SERVER_ERROR.value());

        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
