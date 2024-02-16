package com.Agari.TT.global.Exception;

import org.springframework.http.HttpStatus;

public enum CustomErrorCode {
    FISHBOWL_NOT_FOUND(HttpStatus.BAD_REQUEST,"존재하지 않는 클럽입니다."),
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST,"존재하지 않는 사용자입니다."),

    APPLICANT_NOT_FOUND(HttpStatus.BAD_REQUEST,"존재하지 않는 신청자입니다."),

    PASSWORD_NOT_MATCH(HttpStatus.BAD_REQUEST,"패스워드가 일치하지 않습니다."),
    PERMISSION_DENIED(HttpStatus.FORBIDDEN,"권한 거부됨"),
    INSUFFICIENT_FUNDS(HttpStatus.BAD_REQUEST,"충분한 코인이 없습니다." );


    HttpStatus status;
    String message;

    CustomErrorCode(HttpStatus status,String msg){
        this.status = status;
        this.message = msg;
    }
}
