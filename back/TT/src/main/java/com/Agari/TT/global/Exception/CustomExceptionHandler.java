package com.Agari.TT.global.Exception;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public CustomErrorResponse handleExeption(CustomException e, HttpServletRequest request){
        log.error("errorCode : {}, url : {}, message : {}",e.getCustomErrorCode(),request.getRequestURI());

        CustomErrorCode errorCode = e.getCustomErrorCode();

        return CustomErrorResponse.builder()
                .status(errorCode.status.value())
                .errorName(errorCode.name())
                .errorMessage(errorCode.message)
                .build();
    }
}
