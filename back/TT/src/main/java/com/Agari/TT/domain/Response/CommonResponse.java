package com.Agari.TT.domain.Response;

import lombok.Getter;

@Getter
public class CommonResponse {
    boolean success;
    int code;
    String message;

    public void setSuccessResponse() {
        code = 0;
        success = true;
        message = "SUCCESS";
    }

    public void setSuccessResponse(String msg) {
        code = 0;
        success = true;
        message = msg;
    }

    public void setFailResponse(String msg){
        code = 1;
        success = false;
        message = msg;
    }

    public void setMessage(String msg){
        this.message = msg;
    }

    public CommonResponse(String msg){
        setSuccessResponse(msg);
    }

    public CommonResponse(String msg, boolean bool){
        if(!bool) setFailResponse(msg);
    }

    public  CommonResponse(){

    }
}
