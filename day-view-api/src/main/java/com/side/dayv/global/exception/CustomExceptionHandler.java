package com.side.dayv.global.exception;

import com.side.dayv.global.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = NotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ApiResponse notFoundException(NotFoundException e) {
        return ApiResponse.fail(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }

    @ExceptionHandler(value = AlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ApiResponse alreadyExistsException(AlreadyExistsException e) {
        return ApiResponse.fail(HttpStatus.CONFLICT.value(), e.getMessage());
    }
}
