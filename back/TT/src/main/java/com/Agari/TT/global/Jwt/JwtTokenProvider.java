package com.Agari.TT.global.Jwt;


import com.Agari.TT.domain.Member.Entity.Enum.Role;
import com.Agari.TT.global.Security.Service.CustomMemberDetailSerivce;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final CustomMemberDetailSerivce customMemberDetailSerivce;

    @Value("${jwt.secret}")
    private String secretKey = "secretKey";

//    private final long tokenValidMilliSecond = 1000L * 60 *60;
    private final long tokenValidMilliSecond = 5184000000L; // 2개월 기간

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(String logindId, Role role){
        Claims claims = Jwts.claims().setSubject(logindId);
        claims.put("role",role);

        Date now = new Date();

        // token 생성
        String token = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMilliSecond))
                .signWith(SignatureAlgorithm.HS256,secretKey)
                .compact();

        return token;
    }


    /**
     *  필터에서 인증이 성공했을 때 SecurityContextHolder에 Authentication을 생성하는 역할
     *
     */
    public Authentication getAuthentication(String token){
        // 일단 임의로 업캐스팅 된 채로 두는데 후에 멤버에 대한 상세한 정보가 필요하면 MemberDetail로 바꿔야 함
        UserDetails memberDetail = customMemberDetailSerivce.loadUserByUsername(this.getUserName(token));

        return new UsernamePasswordAuthenticationToken(memberDetail,"",memberDetail.getAuthorities());
    }

    public String getUserName(String token) {
        String info = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();

        return info;
    }

    /**
     * 클라이언트가 헤더를 통해 어플리케이션 서버로 JWT 토큰 값을 전달해야 됨!
     */
    public String resolveToken(HttpServletRequest request){

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7); // 'Bearer ' 이후의 토큰 부분 추출
            // 토큰 검증 및 파싱 로직 수행
            return token;
        }

        return "";
    }

    /**
     * 토큰 유효기간 체크
     */
    public boolean validateToken(String token){
        try{
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        }
        catch (Exception e){
            return false;
        }
    }



}
