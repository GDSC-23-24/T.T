package com.Agari.TT.global.Security.Handler;

import com.Agari.TT.domain.Response.CommonResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    /**
     * 로그인을 했으나 권한이 없는 사람이 접근할 때
     */

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json;charset=UTF-8"); // JSON 응답을 UTF-8로 설정
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        CommonResponse commonResponse = new CommonResponse();
        commonResponse.setFailResponse("적절한 권한을 가진 사용자가 아닙니다.");
        response.getWriter().write(objectMapper.writeValueAsString(commonResponse));

        response.getWriter().flush();
        response.getWriter().close();
    }
}
