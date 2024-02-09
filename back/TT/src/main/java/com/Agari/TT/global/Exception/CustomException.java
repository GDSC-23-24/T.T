package com.Agari.TT.global.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{
    private CustomErrorCode customErrorCode;

}
